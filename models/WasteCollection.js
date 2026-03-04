const mongoose = require('mongoose');

const wasteCollectionSchema = new mongoose.Schema({
  collectionId: {
    type: String,
    unique: true,
    required: true
  },
  source: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'medical', 'other'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    },
    ward: String,
    city: String,
    district: String
  },
  wasteType: {
    type: String,
    enum: ['organic', 'plastic', 'metal', 'paper', 'glass', 'hazardous', 'mixed'],
    required: true
  },
  quantity: {
    value: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ['kg', 'tons', 'liters', 'bags'],
      default: 'kg'
    }
  },
  collectionDate: {
    type: Date,
    required: true
  },
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for geospatial queries
wasteCollectionSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('WasteCollection', wasteCollectionSchema);
