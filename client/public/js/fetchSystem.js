/**
 * Enhanced Fetch System with Caching, Retry Logic, and Request Deduplication
 * Wraps the existing APIClient to add advanced features
 */

class FetchSystem {
  constructor(apiClient, options = {}) {
    this.apiClient = apiClient;
    this.cacheStore = new Map();
    this.pendingRequests = new Map(); // For deduplication
    this.offlineQueue = [];
    this.isOnline = navigator.onLine;

    // Options
    this.defaultCacheTTL = options.cacheTTL || 5 * 60 * 1000; // 5 minutes default
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000; // milliseconds
    this.retryBackoffMultiplier = options.retryBackoffMultiplier || 2;

    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processOfflineQueue();
      console.log('[FetchSystem] Back online');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('[FetchSystem] Went offline');
    });
  }

  /**
   * Create a cache key from endpoint and options
   */
  getCacheKey(endpoint, options = {}) {
    const optionsStr = Object.keys(options)
      .filter(key => key !== 'headers' && key !== 'body')
      .sort()
      .map(key => `${key}=${JSON.stringify(options[key])}`)
      .join('&');
    return `${endpoint}${optionsStr ? '?' + optionsStr : ''}`;
  }

  /**
   * Get from cache if valid
   */
  getFromCache(endpoint, options = {}) {
    const key = this.getCacheKey(endpoint, options);
    const cached = this.cacheStore.get(key);

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      console.log(`[FetchSystem] Cache hit for ${endpoint}`);
      return cached.data;
    }

    // Remove expired cache entry
    if (cached) {
      this.cacheStore.delete(key);
    }

    return null;
  }

  /**
   * Store in cache with TTL
   */
  setCache(endpoint, data, options = {}, ttl = this.defaultCacheTTL) {
    const key = this.getCacheKey(endpoint, options);
    this.cacheStore.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
    console.log(`[FetchSystem] Cache set for ${endpoint}`);
  }

  /**
   * Clear cache for endpoint or clear all
   */
  clearCache(endpoint = null) {
    if (endpoint) {
      const keysToDelete = [];
      for (let key of this.cacheStore.keys()) {
        if (key.startsWith(endpoint)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach(key => this.cacheStore.delete(key));
      console.log(`[FetchSystem] Cleared cache for ${endpoint}`);
    } else {
      this.cacheStore.clear();
      console.log('[FetchSystem] Cleared all cache');
    }
  }

  /**
   * Retry logic with exponential backoff
   */
  async retryRequest(fn, endpoint, attempt = 1) {
    try {
      return await fn();
    } catch (error) {
      if (attempt < this.maxRetries && this.isRetryableError(error)) {
        const delay = this.retryDelay * Math.pow(this.retryBackoffMultiplier, attempt - 1);
        console.log(`[FetchSystem] Retrying ${endpoint} (attempt ${attempt}/${this.maxRetries}) after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryRequest(fn, endpoint, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable
   */
  isRetryableError(error) {
    // Retry on network errors, 408 Request Timeout, 429 Too Many Requests, 5xx errors
    const message = error.message || '';
    return message.includes('HTTP 408') ||
           message.includes('HTTP 429') ||
           message.includes('HTTP 5') ||
           message.includes('Network') ||
           message.includes('Failed to fetch');
  }

  /**
   * Deduplicate concurrent requests
   */
  async deduplicatedRequest(endpoint, options, fetchFn) {
    const key = this.getCacheKey(endpoint, options);

    // If request already pending, return existing promise
    if (this.pendingRequests.has(key)) {
      console.log(`[FetchSystem] Returning pending request for ${endpoint}`);
      return this.pendingRequests.get(key);
    }

    // Create new request promise
    const promise = fetchFn();
    this.pendingRequests.set(key, promise);

    try {
      const result = await promise;
      return result;
    } finally {
      this.pendingRequests.delete(key);
    }
  }

  /**
   * Add request to offline queue if offline
   */
  queueOfflineRequest(endpoint, options, method = 'GET') {
    if (!this.isOnline) {
      this.offlineQueue.push({ endpoint, options, method, timestamp: Date.now() });
      console.log(`[FetchSystem] Request queued for offline (queue size: ${this.offlineQueue.length})`);
      return true;
    }
    return false;
  }

  /**
   * Process offline queue when back online
   */
  async processOfflineQueue() {
    if (this.offlineQueue.length === 0) return;

    console.log(`[FetchSystem] Processing ${this.offlineQueue.length} offline requests`);
    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const request of queue) {
      try {
        if (request.method === 'GET') {
          await this.fetch(request.endpoint, request.options);
        } else {
          await this.request(request.endpoint, request.options);
        }
      } catch (error) {
        console.error(`[FetchSystem] Failed to process offline request:`, error);
        // Re-queue failed requests
        this.offlineQueue.push(request);
      }
    }
  }

  /**
   * Enhanced GET request with caching and retry
   */
  async fetch(endpoint, options = {}) {
    // Check cache for GET requests
    const cached = this.getFromCache(endpoint, options);
    if (cached) {
      return cached;
    }

    // Queue offline requests
    if (this.queueOfflineRequest(endpoint, options, 'GET')) {
      throw new Error('Offline - request queued for later');
    }

    // Deduplicate and retry
    return this.deduplicatedRequest(endpoint, options, async () => {
      return this.retryRequest(
        () => this.apiClient.get(endpoint),
        endpoint
      ).then(data => {
        this.setCache(endpoint, data, options);
        return data;
      });
    });
  }

  /**
   * Enhanced POST request with retry
   */
  async request(endpoint, options = {}) {
    // Queue offline requests
    if (this.queueOfflineRequest(endpoint, options, options.method || 'POST')) {
      throw new Error('Offline - request queued for later');
    }

    // Deduplicate and retry
    const method = options.method || 'POST';
    return this.deduplicatedRequest(endpoint, options, async () => {
      return this.retryRequest(
        () => {
          if (method === 'POST') {
            return this.apiClient.post(endpoint, options.body);
          } else if (method === 'PUT') {
            return this.apiClient.put(endpoint, options.body);
          } else if (method === 'PATCH') {
            return this.apiClient.patch(endpoint, options.body);
          } else if (method === 'DELETE') {
            return this.apiClient.delete(endpoint);
          }
        },
        endpoint
      );
    });
  }

  /**
   * Get stats about cache and queue
   */
  getStats() {
    return {
      cacheSize: this.cacheStore.size,
      cacheEntries: Array.from(this.cacheStore.keys()),
      offlineQueueSize: this.offlineQueue.length,
      pendingRequests: this.pendingRequests.size,
      isOnline: this.isOnline
    };
  }

  /**
   * Debug logging
   */
  debug(enabled = true) {
    if (enabled) {
      console.log('[FetchSystem] Debug mode enabled');
      console.log(this.getStats());
    }
  }
}

/**
 * Service methods using fetch system
 * Each method can now benefit from caching, retry, and deduplication
 */
const cachedAuthService = {
  register: (data) => fetchSystem.request('/auth/register', { method: 'POST', body: data }),
  login: (data) => fetchSystem.request('/auth/login', { method: 'POST', body: data }),
  logout: () => fetchSystem.request('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => fetchSystem.fetch('/auth/me'),
  refreshToken: () => fetchSystem.request('/auth/refresh-token', { method: 'POST' })
};

const cachedCollectionService = {
  getAll: (params) => fetchSystem.fetch(`/collections${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => fetchSystem.fetch(`/collections/${id}`),
  create: (data) => fetchSystem.request('/collections', { method: 'POST', body: data }).then(() => fetchSystem.clearCache('/collections')),
  update: (id, data) => fetchSystem.request(`/collections/${id}`, { method: 'PUT', body: data }).then(() => fetchSystem.clearCache('/collections')),
  delete: (id) => fetchSystem.request(`/collections/${id}`, { method: 'DELETE' }).then(() => fetchSystem.clearCache('/collections')),
  getByStatus: (status) => fetchSystem.fetch(`/collections/status/${status}`)
};

const cachedScheduleService = {
  getAll: (params) => fetchSystem.fetch(`/schedules${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => fetchSystem.fetch(`/schedules/${id}`),
  create: (data) => fetchSystem.request('/schedules', { method: 'POST', body: data }).then(() => fetchSystem.clearCache('/schedules')),
  update: (id, data) => fetchSystem.request(`/schedules/${id}`, { method: 'PUT', body: data }).then(() => fetchSystem.clearCache('/schedules')),
  delete: (id) => fetchSystem.request(`/schedules/${id}`, { method: 'DELETE' }).then(() => fetchSystem.clearCache('/schedules')),
  updateStatus: (id, status) => fetchSystem.request(`/schedules/${id}/status`, { method: 'PATCH', body: { status } }).then(() => fetchSystem.clearCache('/schedules'))
};

const cachedDisposalService = {
  getAll: (params) => fetchSystem.fetch(`/disposal${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => fetchSystem.fetch(`/disposal/${id}`),
  create: (data) => fetchSystem.request('/disposal', { method: 'POST', body: data }).then(() => fetchSystem.clearCache('/disposal')),
  update: (id, data) => fetchSystem.request(`/disposal/${id}`, { method: 'PUT', body: data }).then(() => fetchSystem.clearCache('/disposal')),
  delete: (id) => fetchSystem.request(`/disposal/${id}`, { method: 'DELETE' }).then(() => fetchSystem.clearCache('/disposal')),
  updateCapacity: (id, data) => fetchSystem.request(`/disposal/${id}/capacity`, { method: 'PATCH', body: data }).then(() => fetchSystem.clearCache('/disposal'))
};

const cachedReportService = {
  getAll: (params) => fetchSystem.fetch(`/reports${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => fetchSystem.fetch(`/reports/${id}`),
  generate: (data) => fetchSystem.request('/reports/generate', { method: 'POST', body: data }).then(() => fetchSystem.clearCache('/reports')),
  download: (id) => fetchSystem.fetch(`/reports/${id}/download`),
  updateStatus: (id, status) => fetchSystem.request(`/reports/${id}/status`, { method: 'PATCH', body: { status } }).then(() => fetchSystem.clearCache('/reports')),
  delete: (id) => fetchSystem.request(`/reports/${id}`, { method: 'DELETE' }).then(() => fetchSystem.clearCache('/reports'))
};

const cachedUserService = {
  getAll: (params) => fetchSystem.fetch(`/users${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => fetchSystem.fetch(`/users/${id}`),
  update: (id, data) => fetchSystem.request(`/users/${id}`, { method: 'PUT', body: data }).then(() => fetchSystem.clearCache('/users')),
  updateRole: (id, role) => fetchSystem.request(`/users/${id}/role`, { method: 'PATCH', body: { role } }).then(() => fetchSystem.clearCache('/users')),
  delete: (id) => fetchSystem.request(`/users/${id}`, { method: 'DELETE' }).then(() => fetchSystem.clearCache('/users'))
};

// Initialize global fetch system instance
let fetchSystem;
document.addEventListener('DOMContentLoaded', () => {
  fetchSystem = new FetchSystem(api, {
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    maxRetries: 3,
    retryDelay: 1000
  });
});
