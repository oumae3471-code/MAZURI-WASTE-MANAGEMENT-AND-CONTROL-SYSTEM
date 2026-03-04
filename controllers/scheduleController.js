const Schedule = require('../models/Schedule');
const logger = require('../utils/logger');
const { sendScheduleNotification } = require('../utils/emailService');

// Get all schedules
exports.getAllSchedules = async (req, res, next) => {
  try {
    const { status, skip = 0, limit = 10 } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const schedules = await Schedule.find(filter)
      .populate('assignedCollectors', 'firstName lastName email')
      .populate('supervisor', 'firstName lastName email')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ startDate: 1 });

    const total = await Schedule.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: schedules,
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

// Get single schedule
exports.getSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('assignedCollectors', 'firstName lastName email phone')
      .populate('supervisor', 'firstName lastName email');

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
};

// Create schedule
exports.createSchedule = async (req, res, next) => {
  try {
    const { title, startDate, endDate, assignedVehicle, assignedCollectors, supervisor } = req.body;

    const schedule = await Schedule.create({
      scheduleId: `SCH-${Date.now()}`,
      title,
      startDate,
      endDate,
      assignedVehicle,
      assignedCollectors,
      supervisor,
      status: 'scheduled'
    });

    await schedule.populate(['assignedCollectors', 'supervisor']);

    logger.info(`New schedule created: ${schedule.scheduleId}`);

    res.status(201).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
};

// Update schedule
exports.updateSchedule = async (req, res, next) => {
  try {
    let schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(['assignedCollectors', 'supervisor']);

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update schedule status
exports.updateScheduleStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate(['assignedCollectors', 'supervisor']);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
};
