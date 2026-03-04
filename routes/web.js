const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// middleware to protect pages
function ensureAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect('/login');
}

function redirectIfAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  next();
}

// login form
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { error: null });
});

// login submission
router.post('/login', redirectIfAuthenticated, async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.render('login', { error: 'Please fill in all fields' });
    }
    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    if (!user) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    const match = await user.matchPassword(password);
    if (!match) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    // success
    req.session.userId = user._id;
    req.session.firstName = user.firstName;
    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.render('login', { error: 'An error occurred' });
  }
});

// register form
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', redirectIfAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.render('register', { error: 'Please fill in required fields' });
    }
    let existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.render('register', { error: 'Email already registered' });
    }
    const user = new User({ firstName, lastName, email, password, phone });
    await user.save();
    req.session.userId = user._id;
    req.session.firstName = user.firstName;
    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.render('register', { error: 'Registration failed' });
  }
});

// dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', { firstName: req.session.firstName });
});

// logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// root redirect
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  return res.redirect('/login');
});

module.exports = router;
