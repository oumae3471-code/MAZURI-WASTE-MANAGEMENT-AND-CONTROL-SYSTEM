# Mazuri Waste Management and Control System

> The frontend uses a single JavaScript bundle (`app.bundle.js`) that combines core utilities (API client, auth helpers, fetch system, etc.). Run `npm run build:bundle` inside the `client` directory whenever you modify these files.


> A comprehensive web-based platform designed to streamline waste collection, monitoring, and disposal. This system automates scheduling, tracks waste sources, and generates reports, reducing manual errors, enhancing efficiency, and promoting environmental sustainability in communities and institutions.

**📚 Documentation**: [Quick Start](QUICKSTART.md) | [Project Structure](PROJECT_STRUCTURE.md) | [API Reference](API.md) | [Contributing](CONTRIBUTING.md) | [File Manifest](FILE_MANIFEST.md)

## Key Features

- **Waste Collection Scheduling**: Automated scheduling for collection vehicles and personnel
- **Real-time Monitoring**: Track waste sources and collection progress in real-time
- **Disposal Tracking**: Monitor waste disposal and environmental impact
- **Report Generation**: Generate detailed reports on waste management activities
- **User Management**: Role-based access control for administrators, collectors, and supervisors
- **Dashboard Analytics**: Visual insights into waste collection and disposal metrics
- **Mobile-Responsive**: Accessible on desktop and mobile devices

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Charts**: Recharts

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm package manager

### Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client && npm install && cd ..
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure your environment variables

### Running the Application

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Waste Collection
- `GET /api/collections` - Get all collections
- `POST /api/collections` - Create new collection
- `GET /api/collections/:id` - Get collection details
- `PUT /api/collections/:id` - Update collection
- `DELETE /api/collections/:id` - Delete collection

### Scheduling
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create schedule
- `GET /api/schedules/:id` - Get schedule details
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

### Disposal Tracking
- `GET /api/disposal` - Get all disposal records
- `POST /api/disposal` - Create disposal record
- `PUT /api/disposal/:id` - Update disposal record

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports/generate` - Generate report
- `GET /api/reports/:id/download` - Download report

## Features

### 1. Waste Collection Scheduling
- Route optimization for vehicles
- Real-time task assignment
- GPS tracking

### 2. Waste Tracking
- Source categorization (Residential, Commercial, Industrial, Medical)
- Volume and weight tracking
- Historical analysis

### 3. Disposal Management
- Multiple site management
- Capacity tracking
- Compliance reporting

### 4. Analytics & Reporting
- Daily summaries
- Cost analysis
- Environmental impact metrics

### 5. User Roles
- Admin: Full access
- Manager: Scheduling and reporting
- Collector: Task assignment
- Supervisor: Team monitoring
- Viewer: Read-only access

## 📖 Complete Documentation

All documentation is cross-linked for easy navigation:

| Document | Overview |
|----------|----------|
| **[Quick Start](QUICKSTART.md)** | Get up and running in 5 minutes - Complete setup guide with prerequisites, installation steps, common commands, and troubleshooting |
| **[Project Structure](PROJECT_STRUCTURE.md)** | Understand the system architecture - Backend & frontend design, database models, API patterns, and component organization |
| **[API Reference](API.md)** | Complete endpoint documentation - All 20+ REST API endpoints with request/response examples, authentication, and error codes |
| **[File Manifest](FILE_MANIFEST.md)** | Detailed file breakdown - Complete listing of all files with descriptions, technology stack, and feature checklist |
| **[Contributing Guide](CONTRIBUTING.md)** | Development guidelines - How to contribute, code style, testing requirements, and bug reporting process |

### Quick Links by Task

- 🚀 **Just starting?** → Start with [Quick Start](QUICKSTART.md)
- 🏗️ **Understanding architecture?** → Read [Project Structure](PROJECT_STRUCTURE.md)
- 🔌 **Building API integration?** → Check [API Reference](API.md)
- 🤝 **Want to contribute?** → See [Contributing Guide](CONTRIBUTING.md)
- 📂 **Exploring codebase?** → Check [File Manifest](FILE_MANIFEST.md)

## License

MIT License - See [LICENSE](LICENSE) file for details

## Support

For support, email support@mazuri.com

---

**Home** | [Quick Start](QUICKSTART.md) | [Architecture](PROJECT_STRUCTURE.md) | [API Reference](API.md) | [Contributing](CONTRIBUTING.md) | [Files](FILE_MANIFEST.md)
