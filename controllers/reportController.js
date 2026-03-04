const Report = require('../models/Report');
const WasteCollection = require('../models/WasteCollection');
const logger = require('../utils/logger');
const { generateReportPDF } = require('../utils/pdfGenerator');

// Get all reports
exports.getAllReports = async (req, res, next) => {
  try {
    const { reportType, status, skip = 0, limit = 10 } = req.query;

    let filter = {};
    if (reportType) filter.reportType = reportType;
    if (status) filter.status = status;

    const reports = await Report.find(filter)
      .populate('generatedBy', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Report.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: reports,
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

// Get single report
exports.getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('generatedBy', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// Generate report
exports.generateReport = async (req, res, next) => {
  try {
    const { reportType, startDate, endDate, title } = req.body;

    // Fetch collections for the date range
    const collections = await WasteCollection.find({
      collectionDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    // Calculate summary statistics
    let totalWaste = 0;
    const wasteByType = {};
    const wasteBySource = {};

    collections.forEach(collection => {
      totalWaste += collection.quantity.value;

      // Group by type
      if (!wasteByType[collection.wasteType]) {
        wasteByType[collection.wasteType] = 0;
      }
      wasteByType[collection.wasteType] += collection.quantity.value;

      // Group by source
      if (!wasteBySource[collection.source]) {
        wasteBySource[collection.source] = 0;
      }
      wasteBySource[collection.source] += collection.quantity.value;
    });

    // Create report
    const report = await Report.create({
      reportId: `REP-${Date.now()}`,
      title: title || `${reportType} Report ${new Date().toLocaleDateString()}`,
      reportType,
      generatedBy: req.user._id,
      dateRange: {
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      },
      summary: {
        totalWasteCollected: {
          value: totalWaste,
          unit: 'kg'
        },
        totalCollections: collections.length,
        collectorsInvolved: new Set(collections.map(c => c.collector.toString())).size,
        vehiclesUsed: new Set(collections.map(c => c.vehicle)).size
      },
      status: 'draft'
    });

    logger.info(`Report generated: ${report.reportId}`);

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// Download report as PDF
exports.downloadReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const pdfResult = await generateReportPDF(report);

    res.download(pdfResult.filePath, pdfResult.fileName);
    logger.info(`Report downloaded: ${pdfResult.fileName}`);
  } catch (error) {
    next(error);
  }
};

// Update report status
exports.updateReportStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy: status === 'approved' ? req.user._id : undefined,
        approvalDate: status === 'approved' ? new Date() : undefined
      },
      { new: true }
    ).populate('generatedBy')
      .populate('approvedBy');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// Delete report
exports.deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
