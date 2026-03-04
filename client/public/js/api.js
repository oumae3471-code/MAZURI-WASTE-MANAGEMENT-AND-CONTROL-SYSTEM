// API Client - handles all API calls with authentication
class APIClient {
  constructor(baseURL = '') {
    // Try to get API URL from multiple sources
    this.baseURL = baseURL || 
                   localStorage.getItem('apiUrl') || 
                   window.API_URL || 
                   'http://localhost:5000/api';
    
    console.log('[APIClient] Initialized with baseURL:', this.baseURL);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log('[APIClient] Request:', options.method || 'GET', url);
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        console.warn('[APIClient] 401 Unauthorized - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
        return null;
      }

      if (response.status === 404) {
        throw new Error('Resource not found');
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        console.error('[APIClient] Error response:', error);
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('[APIClient] Response:', data);
      return data;
    } catch (error) {
      console.error('[APIClient] Network/Parse Error:', error.message);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create global API client instance
const api = new APIClient();

// Auth Service
const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh-token')
};

// Collections Service
const collectionService = {
  getAll: (params) => api.get(`/collections${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => api.get(`/collections/${id}`),
  create: (data) => api.post('/collections', data),
  update: (id, data) => api.put(`/collections/${id}`, data),
  delete: (id) => api.delete(`/collections/${id}`),
  getByStatus: (status) => api.get(`/collections/status/${status}`)
};

// Schedules Service
const scheduleService = {
  getAll: (params) => api.get(`/schedules${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => api.get(`/schedules/${id}`),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
  updateStatus: (id, status) => api.patch(`/schedules/${id}/status`, { status })
};

// Disposal Service
const disposalService = {
  getAll: (params) => api.get(`/disposal${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => api.get(`/disposal/${id}`),
  create: (data) => api.post('/disposal', data),
  update: (id, data) => api.put(`/disposal/${id}`, data),
  delete: (id) => api.delete(`/disposal/${id}`),
  updateCapacity: (id, data) => api.patch(`/disposal/${id}/capacity`, data)
};

// Reports Service
const reportService = {
  getAll: (params) => api.get(`/reports${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => api.get(`/reports/${id}`),
  generate: (data) => api.post('/reports/generate', data),
  download: (id) => api.get(`/reports/${id}/download`),
  updateStatus: (id, status) => api.patch(`/reports/${id}/status`, { status }),
  delete: (id) => api.delete(`/reports/${id}`)
};

// Users Service
const userService = {
  getAll: (params) => api.get(`/users${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  delete: (id) => api.delete(`/users/${id}`)
};
