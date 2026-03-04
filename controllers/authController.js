const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { sendWelcomeEmail } = require('../utils/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password, phone, role, department } = req.body;

    // Normalize email and phone
    email = email ? String(email).trim().toLowerCase() : email;
    phone = phone ? String(phone).replace(/\D/g, '') : phone;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || 'collector',
      department
    });

    const token = generateToken(user._id);

    // Send welcome email (log errors internally)
    await sendWelcomeEmail(email, user);

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON()
    });

    logger.info(`New user registered: ${email}`);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Accept either email or phone as identifier. Normalize before lookup.
    let identifier = req.body.identifier || req.body.email || req.body.phone;
    const { password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please provide email/phone and password' });
    }

    identifier = String(identifier).trim();
    const identifierLower = identifier.toLowerCase();
    const phoneDigits = identifier.replace(/\D/g, '');

    // Build OR conditions: match email (lowercased) or phone (raw or digits-only)
    const orConditions = [{ email: identifierLower }];
    if (identifier) {
      orConditions.push({ phone: identifier });
    }
    if (phoneDigits) {
      orConditions.push({ phone: phoneDigits });
    }

    const user = await User.findOne({ $or: orConditions }).select('+password');
    logger.info(`Login attempt identifier: ${identifier} (digits:${phoneDigits}) - userFound: ${!!user}`);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: user.toJSON()
    });

    logger.info(`User logged in: ${identifier}`);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = (req, res) => {
  try {
    const token = generateToken(req.user._id);
    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    res.status(401).json({ message: 'Token refresh failed' });
  }
};
