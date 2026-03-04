const express = require('express');
const router = express.Router();
const {
  getAllReports,
  getReport,
  generateReport,
  downloadReport,
  updateReportStatus,
  deleteReport
} = require('../controllers/reportController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllReports);
router.get('/:id', auth, getReport);
router.post('/generate', auth, authorize('admin', 'manager'), generateReport);
router.get('/:id/download', auth, downloadReport);
router.patch('/:id/status', auth, authorize('admin', 'manager'), updateReportStatus);
router.delete('/:id', auth, authorize('admin', 'manager'), deleteReport);

module.exports = router;
