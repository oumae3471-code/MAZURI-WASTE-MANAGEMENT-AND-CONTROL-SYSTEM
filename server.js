const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Optionally connect to MySQL and run migrations
if (process.env.USE_MYSQL === 'true') {
  const { sequelize } = require('./config/sequelize');
  const runMigrations = require('./scripts/run-migrations');

  sequelize.authenticate()
    .then(() => {
      console.log('MySQL connected');
      if (process.env.MIGRATE_ON_STARTUP === 'true') {
        return runMigrations();
      }
      return null;
    })
    .catch((err) => {
      console.error('MySQL connection error:', err);
    });
}

// View engine setup for server-rendered pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Static files (css/html assets)
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Web routes (pages and form handlers)
app.use('/', require('./routes/web'));

// API Routes (remain in case needed for external clients)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/collections', require('./routes/collections'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/disposal', require('./routes/disposal'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;