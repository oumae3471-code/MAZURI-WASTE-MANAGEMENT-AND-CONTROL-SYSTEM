const express = require('express');
const router = express.Router();
const {
  getAllDisposalSites,
  getDisposalSite,
  createDisposalSite,
  updateDisposalSite,
  deleteDisposalSite,
  updateSiteCapacity
} = require('../controllers/disposalController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllDisposalSites);
router.get('/:id', auth, getDisposalSite);
router.post('/', auth, authorize('admin', 'manager'), createDisposalSite);
router.put('/:id', auth, authorize('admin', 'manager'), updateDisposalSite);
router.patch('/:id/capacity', auth, authorize('admin', 'manager'), updateSiteCapacity);
router.delete('/:id', auth, authorize('admin'), deleteDisposalSite);

module.exports = router;
