const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.email,
      subject: options.subject,
      html: options.message
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${options.email}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  welcome: (user) => {
    return `
      <h2>Welcome to Mazuri Waste Management System</h2>
      <p>Dear ${user.firstName} ${user.lastName},</p>
      <p>Your account has been created successfully.</p>
      <p>Role: ${user.role}</p>
      <p>Please log in to start managing waste collection activities.</p>
      <p>Best regards,<br>Mazuri Team</p>
    `;
  },

  scheduleNotification: (schedule, action) => {
    return `
      <h2>Schedule ${action}</h2>
      <p>A waste collection schedule has been ${action.toLowerCase()}.</p>
      <p>Title: ${schedule.title}</p>
      <p>Start Date: ${new Date(schedule.startDate).toLocaleDateString()}</p>
      <p>End Date: ${new Date(schedule.endDate).toLocaleDateString()}</p>
      <p>Please check the system for more details.</p>
    `;
  },

  collectionAlert: (collection) => {
    return `
      <h2>Waste Collection Alert</h2>
      <p>A new waste collection has been recorded.</p>
      <p>Source: ${collection.source}</p>
      <p>Waste Type: ${collection.wasteType}</p>
      <p>Quantity: ${collection.quantity.value} ${collection.quantity.unit}</p>
      <p>Location: ${collection.location.address}</p>
    `;
  },

  reportGenerated: (report) => {
    return `
      <h2>Report Generated</h2>
      <p>A new ${report.reportType} report has been generated.</p>
      <p>Report ID: ${report.reportId}</p>
      <p>Period: ${new Date(report.dateRange.startDate).toLocaleDateString()} to ${new Date(report.dateRange.endDate).toLocaleDateString()}</p>
      <p>Please log in to view the report.</p>
    `;
  }
};

const sendScheduleNotification = async (email, schedule, action) => {
  try {
    await sendEmail({
      email,
      subject: `Schedule ${action} - Mazuri Waste Management`,
      message: emailTemplates.scheduleNotification(schedule, action)
    });
  } catch (error) {
    logger.error(`Error sending schedule notification: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, user) => {
  try {
    await sendEmail({
      email,
      subject: 'Welcome to Mazuri Waste Management System',
      message: emailTemplates.welcome(user)
    });
  } catch (error) {
    logger.error(`Error sending welcome email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
  sendScheduleNotification,
  sendWelcomeEmail,
  emailTemplates
};
