const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  collectionPoints: [{
    location: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    priority: {
      type: Number,
      min: 1,
      max: 10
    }
  }],
  assignedVehicle: {
    type: String,
    required: true
  },
  assignedCollectors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'biweekly', 'monthly', 'once'],
    default: 'weekly'
  },
  estimatedDuration: {
    value: Number,
    unit: {
      type: String,
      enum: ['hours', 'minutes'],
      default: 'hours'
    }
  },
  expectedQuantity: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'tons', 'liters', 'bags'],
      default: 'kg'
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'active', 'completed', 'cancelled', 'on-hold'],
    default: 'scheduled'
  },
  route: {
    type: String,
    enum: ['optimized', 'manual', 'standard'],
    default: 'optimized'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    app: { type: Boolean, default: true }
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

module.exports = mongoose.model('Schedule', scheduleSchema);
