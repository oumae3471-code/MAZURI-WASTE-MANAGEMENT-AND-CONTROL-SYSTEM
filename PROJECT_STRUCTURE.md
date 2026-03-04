# Mazuri Waste Management System - Project Structure

**📚 [Back to Main](README.md)** | [Quick Start](QUICKSTART.md) | [API Reference](API.md) | [Contributing](CONTRIBUTING.md) | [File Manifest](FILE_MANIFEST.md)

## Overview
The Mazuri Waste Management System is a comprehensive web-based platform built with modern technologies:

## 📑 Quick Navigation
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)  
- [Database Models](#key-database-models)
- [API Documentation](API.md) - Full endpoint reference
- [File Organization](FILE_MANIFEST.md) - Complete file listing

## Architecture

### Backend (Node.js + Express)
- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Role-based access control
- Email notifications
- PDF report generation

### Frontend (React)
- Single Page Application (SPA)
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualization

## Project Directory Structure

```
MAZURI-WASTE-MANAGEMENT-AND-CONTROL-SYSTEM/
│
├── Backend Root Files
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Backend dependencies
├── server.js                    # Main server entry point
├── Dockerfile                   # Docker image for backend
├── docker-compose.yml           # Docker composition (backend + DB + frontend)
├── setup.sh                     # Automated setup script
│
├── config/                      # Configuration files
│   ├── database.js             # Database connection setup
│   └── environment.js          # Environment variables management
│
├── models/                      # Mongoose schemas
│   ├── User.js                 # User model with password hashing
│   ├── WasteCollection.js      # Waste collection tracking
│   ├── Schedule.js             # Collection scheduling
│   ├── DisposalSite.js         # Disposal site management
│   └── Report.js               # Report generation model
│
├── routes/                      # API routes
│   ├── auth.js                 # Authentication endpoints
│   ├── collections.js          # Waste collection endpoints
│   ├── schedules.js            # Schedule management endpoints
│   ├── disposal.js             # Disposal site endpoints
│   ├── reports.js              # Report generation endpoints
│   └── users.js                # User management endpoints
│
├── controllers/                 # Business logic
│   ├── authController.js       # Authentication logic
│   ├── collectionController.js # Collection operations
│   ├── scheduleController.js   # Schedule operations
│   ├── disposalController.js   # Disposal site operations
│   └── reportController.js     # Report generation logic
│
├── middleware/                  # Express middleware
│   ├── auth.js                 # JWT authentication & role authorization
│   ├── errorHandler.js         # Global error handling
│   └── validation.js           # Input validation utilities
│
├── utils/                       # Utility functions
│   ├── logger.js               # Logging utility
│   ├── emailService.js         # Email notification service
│   └── pdfGenerator.js         # PDF report generation
│
├── scripts/                     # Utility scripts
│   ├── seedData.js             # Database seeding
│   └── generateReport.js       # Report generation script
│
├── client/                      # React Frontend Application
│   ├── package.json            # Frontend dependencies
│   ├── Dockerfile              # Docker image for frontend
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   │
│   ├── public/
│   │   └── index.html          # HTML entry point
│   │
│   └── src/
│       ├── App.js              # Main App component
│       ├── App.css             # App styles
│       ├── index.js            # React entry point
│       ├── index.css           # Global styles
│       │
│       ├── components/         # Reusable components
│       │   ├── Navbar.js      # Top navigation bar
│       │   └── Sidebar.js     # Side navigation
│       │
│       ├── pages/              # Page components
│       │   ├── Dashboard.js   # Admin dashboard
│       │   ├── Collections.js # Collections management
│       │   ├── Schedules.js   # Schedule management
│       │   ├── Disposal.js    # Disposal sites
│       │   ├── Reports.js     # Reports view
│       │   ├── Users.js       # User management
│       │   ├── Login.js       # Login page
│       │   ├── Register.js    # Registration page
│       │   └── NotFound.js    # 404 page
│       │
│       ├── services/
│       │   └── api.js          # API service with axios
│       │
│       └── store/
│           ├── store.js        # Redux store configuration
│           └── collectionSlice.js # Collection state slice
│
├── Documentation
├── README.md                    # Project README
├── API.md                       # API documentation
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
└── .env.example                 # Environment variables template
```

## 📋 Quick Navigation

- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Database Design](#database-design)
- [API & Communication](#api--communication)
- [Technology Stack](#technology-stack)

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **nodemailer**: Email service
- **pdf-lib**: PDF generation
- **axios**: HTTP client

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Redux**: State management
- **Redux Thunk**: Async actions
- **Axios**: HTTP client
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Lucide React**: Icons

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **MongoDB**: Database

## Key Features

### 1. Waste Collection Management
- Track waste collections by source type
- Categorize waste (organic, plastic, metal, paper, glass, hazardous, mixed)
- GPS-enabled location tracking
- Real-time status updates

### 2. Scheduling & Optimization
- Automatic route optimization
- Recurring schedule support
- Collector assignment
- Vehicle allocation
- Priority management

### 3. Disposal Site Management
- Multi-site management
- Capacity tracking and alerts
- Environmental compliance tracking
- Operating hours management
- Waste type acceptance rules

### 4. Reporting & Analytics
- Daily, weekly, monthly, quarterly, annual reports
- Waste stream analysis
- Cost-benefit reporting
- Environmental impact metrics
- PDF export functionality

### 5. User Management
- Role-based access control (Admin, Manager, Collector, Supervisor, Viewer)
- Department assignment
- User authentication with JWT
- Email notifications
- Activity logging

## Data Models

### User
- Profile information (name, email, phone)
- Authentication credentials (hashed password)
- Role and department assignments
- Last login tracking
- Status management

### WasteCollection
- Collection ID and tracking
- Source type classification
- Waste type categorization
- Quantity and unit tracking
- GPS location data
- Collector assignment
- Vehicle tracking
- Status management

### Schedule
- Title and description
- Date range specification
- Vehicle and collector assignments
- Collection point routing
- Frequency configuration
- Estimated duration and quantity
- Priority levels
- Notification settings

### DisposalSite
- Site information (name, type, location)
- Capacity management (total and current)
- Operating hours
- Environmental compliance
- Inspection tracking
- Manager assignment
- Waste type acceptance

### Report
- Report type and generation date
- Date range specification
- Summary statistics
- Waste breakdown analysis
- Performance metrics
- Environmental impact
- Financial data
- Recommendations
- Approval workflow

## API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "pagination": { "total": 10, "skip": 0, "limit": 10 }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Authentication Flow

1. User registers/logs in through API
2. Server returns JWT token and user data
3. Client stores token in localStorage
4. Request headers include: `Authorization: Bearer <token>`
5. Server validates token and checks user role
6. Response returns protected data if authorized

## Getting Started

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/mazuri-waste-management.git

# Run setup script
chmod +x setup.sh
./setup.sh

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

**Development Mode**:
```bash
npm run dev
```

**With Docker**:
```bash
docker-compose up --build
```

### Seeding Database
```bash
npm run seed
```

## Environment Variables

See `.env.example` for all configuration options including:
- Server configuration (PORT, NODE_ENV)
- Database settings (MongoDB URI)
- JWT secrets and expiry
- Email service configuration
- File upload settings
- Frontend API URL

## Testing

The system includes:
- Backend API endpoint testing
- Frontend component testing
- Database seeding for demo data
- Report generation testing

## Deployment

Supports deployment on:
- Heroku
- AWS (EC2, ECS)
- Google Cloud
- Azure
- DigitalOcean
- Any Node.js hosting provider

Docker containers can be deployed to:
- Docker Hub
- AWS ECR
- Google Container Registry
- Azure Container Registry

## File Manifest

- **Models**: 5 MongoDB schemas
- **Routes**: 6 API route modules
- **Controllers**: 5 business logic modules
- **Middleware**: 3 middleware functions
- **Utils**: 3 utility modules
- **React Components**: 2 layouts + 1 Navbar
- **React Pages**: 8 page components
- **Services**: 1 API service
- **Config**: 2 config files
- **Scripts**: 2 utility scripts
- **Documentation**: 4 markdown files

**Total: 60+ project files**

## Support & Documentation

- **README.md**: Project overview and setup
- **API.md**: Complete API documentation
- **CONTRIBUTING.md**: Contribution guidelines
- **LICENSE**: MIT License

## Future Enhancements

- Mobile app (React Native)
- Advanced analytics dashboard
- Machine learning for route optimization
- Real-time GPS tracking
- SMS notifications
- Integration with IoT sensors
- Multi-language support
- Advanced reporting templates
- API rate limiting
- Export to multiple formats (Excel, CSV)

## License

MIT License - See LICENSE file for details

## Contact

Support: support@mazuri.com

---

**Documentation**: [Home](README.md) | [Quick Start](QUICKSTART.md) | Architecture | [API](API.md) | [Contributing](CONTRIBUTING.md) | [Files](FILE_MANIFEST.md)
Website: www.mazuri.com
