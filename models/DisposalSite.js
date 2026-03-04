const mongoose = require('mongoose');

const disposalSiteSchema = new mongoose.Schema({
  siteId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: String,
    district: String
  },
  siteType: {
    type: String,
    enum: ['landfill', 'recycling', 'incineration', 'composting', 'hazmat', 'transfer-station'],
    required: true
  },
  capacity: {
    total: {
      value: Number,
      unit: {
        type: String,
        enum: ['tons', 'cubic-meters'],
        default: 'tons'
      }
    },
    current: {
      value: Number,
      unit: {
        type: String,
        enum: ['tons', 'cubic-meters'],
        default: 'tons'
      }
    }
  },
  operatingHours: {
    opening: String, // HH:mm format
    closing: String  // HH:mm format
  },
  acceptedWasteTypes: [{
    type: String,
    enum: ['organic', 'plastic', 'metal', 'paper', 'glass', 'hazardous', 'mixed']
  }],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contact: {
    phone: String,
    email: String
  },
  environmentalCompliance: {
    certified: Boolean,
    certificationBody: String,
    licenseNumber: String,
    expiryDate: Date
  },
  lastInspectionDate: Date,
  nextInspectionDate: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'full'],
    default: 'active'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

disposalSiteSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('DisposalSite', disposalSiteSchema);
