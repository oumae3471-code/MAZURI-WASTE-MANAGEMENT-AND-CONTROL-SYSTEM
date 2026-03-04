const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validateCollection = (data) => {
  const errors = {};

  if (!data.source || !['residential', 'commercial', 'industrial', 'medical', 'other'].includes(data.source)) {
    errors.source = 'Valid source is required';
  }

  if (!data.wasteType || !['organic', 'plastic', 'metal', 'paper', 'glass', 'hazardous', 'mixed'].includes(data.wasteType)) {
    errors.wasteType = 'Valid waste type is required';
  }

  if (!data.quantity || data.quantity < 0) {
    errors.quantity = 'Valid quantity is required';
  }

  if (!data.collectionDate) {
    errors.collectionDate = 'Collection date is required';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

const validateSchedule = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (!data.startDate || !data.endDate) {
    errors.dates = 'Start and end dates are required';
  }

  if (new Date(data.startDate) >= new Date(data.endDate)) {
    errors.dates = 'Start date must be before end date';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

module.exports = {
  validateEmail,
  validatePhone,
  validateCollection,
  validateSchedule
};
