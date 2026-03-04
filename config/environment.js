module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  apiUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  
  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mazuri',
  dbName: process.env.DB_NAME || 'mazuri',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || '30d',
  
  // Email
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,
  
  // File upload
  maxFileSize: process.env.MAX_FILE_SIZE || 10485760,
  allowedFormats: process.env.ALLOWED_FORMATS || 'jpg,png,pdf,xlsx,csv',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  
  // Frontend
  reactAppApiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  reactAppEnv: process.env.REACT_APP_ENV || 'development',
};
