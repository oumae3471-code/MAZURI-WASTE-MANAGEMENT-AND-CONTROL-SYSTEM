// Dashboard page functionality
async function loadDashboard() {
  try {
    // Load collections data
    const collections = await collectionService.getAll({ limit: 10 }).catch(() => ({ data: [] }));
    const collectionsData = collections.data || [];
    
    // Load schedules data
    const schedules = await scheduleService.getAll({ limit: 10 }).catch(() => ({ data: [] }));
    const schedulesData = schedules.data || [];

    // Update statistics
    document.getElementById('totalCollections').textContent = collectionsData.length || 0;
    document.getElementById('pendingSchedules').textContent = 
      schedulesData.filter(s => s.status === 'pending').length || 0;
    
    // Display recent collections
    displayCollections(collectionsData);
    
    // Display upcoming schedules
    displaySchedules(schedulesData);

  } catch (error) {
    console.error('Error loading dashboard:', error);
    showError('Failed to load dashboard data');
  }
}

function displayCollections(collections) {
  const tbody = document.getElementById('collectionsBody');
  
  if (!collections || collections.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No collections found</td></tr>';
    return;
  }

  tbody.innerHTML = collections.map(collection => `
    <tr>
      <td>${collection.source || '--'}</td>
      <td>${collection.wasteType || '--'}</td>
      <td>${collection.quantity?.value || '--'} ${collection.quantity?.unit || ''}</td>
      <td>${collection.location?.address || '--'}</td>
      <td>${formatDate(collection.createdAt)}</td>
      <td><span class="badge badge-${collection.status || 'pending'}">${collection.status || 'pending'}</span></td>
    </tr>
  `).join('');
}

function displaySchedules(schedules) {
  const tbody = document.getElementById('schedulesBody');
  
  if (!schedules || schedules.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No schedules found</td></tr>';
    return;
  }

  tbody.innerHTML = schedules.map(schedule => `
    <tr>
      <td>${schedule.title || '--'}</td>
      <td>${formatDate(schedule.startDate)}</td>
      <td>${formatDate(schedule.endDate)}</td>
      <td><span class="badge badge-${schedule.status || 'pending'}">${schedule.status || 'pending'}</span></td>
      <td>
        <div class="actions">
          <a href="schedule-detail.html?id=${schedule._id || schedule.id}" class="btn-primary btn-small">View</a>
        </div>
      </td>
    </tr>
  `).join('');
}

// Load data when page is ready
document.addEventListener('DOMContentLoaded', () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  } else {
    loadDashboard();
  }
});
