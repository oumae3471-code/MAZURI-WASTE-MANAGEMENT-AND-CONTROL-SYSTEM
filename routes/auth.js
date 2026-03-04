const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser, refreshToken } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/me', auth, getCurrentUser);
router.post('/refresh-token', auth, refreshToken);

module.exports = router;
