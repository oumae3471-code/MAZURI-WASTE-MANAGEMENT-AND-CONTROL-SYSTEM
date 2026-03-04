const DisposalSite = require('../models/DisposalSite');
const logger = require('../utils/logger');

// Get all disposal sites
exports.getAllDisposalSites = async (req, res, next) => {
  try {
    const { siteType, status, skip = 0, limit = 10 } = req.query;

    let filter = {};
    if (siteType) filter.siteType = siteType;
    if (status) filter.status = status;

    const sites = await DisposalSite.find(filter)
      .populate('manager', 'firstName lastName email phone')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await DisposalSite.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: sites,
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

// Get single disposal site
exports.getDisposalSite = async (req, res, next) => {
  try {
    const site = await DisposalSite.findById(req.params.id)
      .populate('manager', 'firstName lastName email phone');

    if (!site) {
      return res.status(404).json({ message: 'Disposal site not found' });
    }

    res.status(200).json({
      success: true,
      data: site
    });
  } catch (error) {
    next(error);
  }
};

// Create disposal site
exports.createDisposalSite = async (req, res, next) => {
  try {
    const { name, siteType, location, capacity, manager } = req.body;

    const site = await DisposalSite.create({
      siteId: `SITE-${Date.now()}`,
      name,
      siteType,
      location,
      capacity,
      manager,
      status: 'active'
    });

    await site.populate('manager', 'firstName lastName email');

    logger.info(`New disposal site created: ${site.siteId}`);

    res.status(201).json({
      success: true,
      data: site
    });
  } catch (error) {
    next(error);
  }
};

// Update disposal site
exports.updateDisposalSite = async (req, res, next) => {
  try {
    let site = await DisposalSite.findById(req.params.id);

    if (!site) {
      return res.status(404).json({ message: 'Disposal site not found' });
    }

    site = await DisposalSite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('manager', 'firstName lastName email');

    res.status(200).json({
      success: true,
      data: site
    });
  } catch (error) {
    next(error);
  }
};

// Delete disposal site
exports.deleteDisposalSite = async (req, res, next) => {
  try {
    const site = await DisposalSite.findByIdAndDelete(req.params.id);

    if (!site) {
      return res.status(404).json({ message: 'Disposal site not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Disposal site deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update site capacity
exports.updateSiteCapacity = async (req, res, next) => {
  try {
    const { currentValue } = req.body;

    const site = await DisposalSite.findByIdAndUpdate(
      req.params.id,
      { 'capacity.current.value': currentValue },
      { new: true }
    );

    if (!site) {
      return res.status(404).json({ message: 'Disposal site not found' });
    }

    res.status(200).json({
      success: true,
      data: site
    });
  } catch (error) {
    next(error);
  }
};
