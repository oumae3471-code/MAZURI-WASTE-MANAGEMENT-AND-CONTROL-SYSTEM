const express = require('express');
const router = express.Router();
const {
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionsByStatus
} = require('../controllers/collectionController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getAllCollections);
router.get('/:id', auth, getCollection);
router.post('/', auth, authorize('admin', 'manager', 'collector'), createCollection);
router.put('/:id', auth, authorize('admin', 'manager', 'collector'), updateCollection);
router.delete('/:id', auth, authorize('admin', 'manager'), deleteCollection);
router.get('/status/:status', auth, getCollectionsByStatus);

module.exports = router;
