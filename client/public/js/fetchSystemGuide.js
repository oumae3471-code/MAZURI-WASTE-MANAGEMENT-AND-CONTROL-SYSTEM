/**
 * USAGE GUIDE: Enhanced Fetch System
 * 
 * The FetchSystem automatically handles:
 * 1. Caching: GET requests are cached for 5 minutes by default
 * 2. Retry Logic: Failed requests retry up to 3 times with exponential backoff
 * 3. Deduplication: Concurrent identical requests return the same promise
 * 4. Offline Support: Requests are queued when offline and processed when back online
 */

// OPTION 1: Use the original API services (no caching)
async function fetchWithoutCache() {
  try {
    const collections = await collectionService.getAll();
    console.log('Collections (no cache):', collections);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// OPTION 2: Use cached services (with all enhancements)
async function fetchWithCache() {
  try {
    // First call will fetch from server and cache
    const collections = await cachedCollectionService.getAll();
    console.log('Collections (cached):', collections);

    // Second call within 5 minutes will return from cache (instant!)
    const collectionsAgain = await cachedCollectionService.getAll();
    console.log('Collections (from cache):', collectionsAgain);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Clear cache manually when needed
function clearCollectionCache() {
  fetchSystem.clearCache('/collections');
  console.log('Cache cleared for collections');
}

// Clear all cache
function clearAllCache() {
  fetchSystem.clearCache();
  console.log('All cache cleared');
}

// Check fetch system stats
function checkStats() {
  const stats = fetchSystem.getStats();
  console.log('Fetch System Stats:', stats);
  console.table(stats);
}

// Enable debug logging
function enableDebug() {
  fetchSystem.debug(true);
}

// Example: Using cached services in your code
async function loadDashboardData() {
  try {
    // All these will use caching and retry
    const [collections, schedules, reports] = await Promise.all([
      cachedCollectionService.getAll(),
      cachedScheduleService.getAll(),
      cachedReportService.getAll()
    ]);

    console.log('Dashboard data loaded with caching');
    return { collections, schedules, reports };
  } catch (error) {
    console.error('Failed to load dashboard data:', error.message);
  }
}

// Example: Creating data and clearing cache
async function createNewCollection(data) {
  try {
    // This will create and automatically clear the cache
    const result = await cachedCollectionService.create(data);
    console.log('Collection created and cache cleared:', result);
    return result;
  } catch (error) {
    console.error('Failed to create collection:', error.message);
  }
}

// Export for use in other scripts
const FetchSystemGuide = {
  fetchWithoutCache,
  fetchWithCache,
  clearCollectionCache,
  clearAllCache,
  checkStats,
  enableDebug,
  loadDashboardData,
  createNewCollection
};
