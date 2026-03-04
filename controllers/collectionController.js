const WasteCollection = require('../models/WasteCollection');
const logger = require('../utils/logger');

// Get all collections
exports.getAllCollections = async (req, res, next) => {
  try {
    const { status, source, startDate, endDate, skip = 0, limit = 10 } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (startDate || endDate) {
      filter.collectionDate = {};
      if (startDate) filter.collectionDate.$gte = new Date(startDate);
      if (endDate) filter.collectionDate.$lte = new Date(endDate);
    }

    const collections = await WasteCollection.find(filter)
      .populate('collector', 'firstName lastName email')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await WasteCollection.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: collections,
      pagination: {
        total,
        skip: parseInt(skip),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single collection
exports.getCollection = async (req, res, next) => {
  try {
    const collection = await WasteCollection.findById(req.params.id)
      .populate('collector', 'firstName lastName email');

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json({
      success: true,
      data: collection
    });
  } catch (error) {
    next(error);
  }
};

// Create collection
exports.createCollection = async (req, res, next) => {
  try {
    const { source, wasteType, quantity, collectionDate, vehicle, location } = req.body;

    const collection = await WasteCollection.create({
      collectionId: `COL-${Date.now()}`,
      source,
      wasteType,
      quantity,
      collectionDate,
      vehicle,
      location,
      collector: req.user._id,
      status: 'scheduled'
    });

    logger.info(`New waste collection created: ${collection.collectionId}`);

    res.status(201).json({
      success: true,
      data: collection
    });
  } catch (error) {
    next(error);
  }
};

// Update collection
exports.updateCollection = async (req, res, next) => {
  try {
    let collection = await WasteCollection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    collection = await WasteCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: collection
    });
  } catch (error) {
    next(error);
  }
};

// Delete collection
exports.deleteCollection = async (req, res, next) => {
  try {
    const collection = await WasteCollection.findByIdAndDelete(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Collection deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get collections by status
exports.getCollectionsByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const collections = await WasteCollection.find({ status })
      .populate('collector', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: collections
    });
  } catch (error) {
    next(error);
  }
};
