const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  updateScheduleStatus
} = require('../controllers/scheduleController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllSchedules);
router.get('/:id', auth, getSchedule);
router.post('/', auth, authorize('admin', 'manager'), createSchedule);
router.put('/:id', auth, authorize('admin', 'manager'), updateSchedule);
router.patch('/:id/status', auth, authorize('admin', 'manager'), updateScheduleStatus);
router.delete('/:id', auth, authorize('admin', 'manager'), deleteSchedule);

module.exports = router;
