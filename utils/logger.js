const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'app.log');
const errorFile = path.join(logsDir, 'error.log');

const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },

  error: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`;
    console.error(logMessage);
    fs.appendFileSync(errorFile, logMessage);
  },

  warn: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`;
    console.warn(logMessage);
    fs.appendFileSync(logFile, logMessage);
  },

  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] DEBUG: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`;
      console.log(logMessage);
    }
  }
};

module.exports = logger;
