const User = require('../models/User');
const Report = require('../models/Report');
const WasteCollection = require('../models/WasteCollection');
const { generateReportPDF } = require('../utils/pdfGenerator');
const logger = require('../utils/logger');
require('dotenv').config();

const generateAndSaveReport = async () => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGODB_URI);

    // Get report from database
    const report = await Report.findOne({ reportId: 'REP-001' });

    if (!report) {
      console.log('No report found. Creating a sample report...');

      // Get admin user
      const admin = await User.findOne({ role: 'admin' });
      if (!admin) {
        throw new Error('No admin user found in database');
      }

      // Get collections for date range
      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endDate = new Date();

      const collections = await WasteCollection.find({
        collectionDate: {
          $gte: startDate,
          $lte: endDate
        }
      });

      // Create report object
      const reportData = {
        reportId: 'REP-001',
        title: 'Monthly Waste Collection Report',
        reportType: 'monthly',
        generatedBy: admin._id,
        dateRange: {
          startDate,
          endDate
        },
        summary: {
          totalWasteCollected: {
            value: collections.reduce((sum, c) => sum + c.quantity.value, 0),
            unit: 'kg'
          },
          totalCollections: collections.length,
          collectorsInvolved: new Set(collections.map(c => c.collector.toString())).size,
          vehiclesUsed: new Set(collections.map(c => c.vehicle)).size
        },
        observations: 'Report generated from sample data',
        recommendations: [
          'Optimize collection routes for Zone A',
          'Schedule maintenance for Vehicle VH-002'
        ]
      };

      const result = await generateReportPDF(reportData);
      console.log('Report PDF generated:', result.fileName);
      logger.info(`Report PDF generated: ${result.fileName}`);
    } else {
      const result = await generateReportPDF(report);
      console.log('Report PDF generated:', result.fileName);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    logger.error('Error generating report:', error);
    console.error('Error generating report:', error.message);
    process.exit(1);
  }
};

generateAndSaveReport();
