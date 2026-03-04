const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  reportType: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annual', 'custom'],
    required: true
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateRange: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  summary: {
    totalWasteCollected: {
      value: Number,
      unit: String
    },
    totalCollections: Number,
    averageQuantityPerCollection: {
      value: Number,
      unit: String
    },
    collectorsInvolved: Number,
    vehiclesUsed: Number,
    disposalSitesUsed: Number
  },
  wasteBreakdown: {
    byType: [{
      type: String,
      quantity: {
        value: Number,
        unit: String
      },
      percentage: Number
    }],
    bySource: [{
      source: String,
      quantity: {
        value: Number,
        unit: String
      },
      percentage: Number
    }]
  },
  performanceMetrics: {
    collectionRate: Number,
    completionRate: Number,
    averageResponseTime: Number,
    costPerTon: Number
  },
  environmentalImpact: {
    co2Equivalent: {
      value: Number,
      unit: String
    },
    landfillDiversion: {
      value: Number,
      unit: String,
      percentage: Number
    },
    recycledMaterial: {
      value: Number,
      unit: String,
      percentage: Number
    }
  },
  financialData: {
    totalCost: Number,
    costBreakdown: {
      collection: Number,
      transportation: Number,
      disposal: Number,
      administration: Number
    },
    revenue: Number,
    netCost: Number
  },
  observations: String,
  recommendations: [String],
  attachments: [String],
  status: {
    type: String,
    enum: ['draft', 'pending-review', 'approved', 'published'],
    default: 'draft'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
