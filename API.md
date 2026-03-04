# Mazuri Waste Management System - API Documentation

**📚 [Back to Main](README.md)** | [Quick Start](QUICKSTART.md) | [Project Structure](PROJECT_STRUCTURE.md) | [Contributing](CONTRIBUTING.md)

> Complete REST API reference with endpoints, request/response formats, and examples

## 📋 Quick Navigation

- [Authentication](#authentication)
- [Collections](#waste-collections)
- [Schedules](#schedules)
- [Disposal](#disposal-tracking)
- [Reports](#reports)
- [Users](#user-management)

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All responses are in JSON format:
```json
{
  "success": true,
  "data": { ... },
  "message": "..."
}
```

## Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "collector"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

#### Refresh Token
```
POST /auth/refresh-token
Authorization: Bearer <token>
```

### Waste Collections

#### Get All Collections
```
GET /collections?status=completed&skip=0&limit=10
Authorization: Bearer <token>
```

Query Parameters:
- `status`: Filter by status (scheduled, in-progress, completed, cancelled)
- `source`: Filter by source (residential, commercial, industrial, medical, other)
- `startDate`: Filter from date (ISO format)
- `endDate`: Filter to date (ISO format)
- `skip`: Pagination offset
- `limit`: Items per page

#### Get Collection by ID
```
GET /collections/:id
Authorization: Bearer <token>
```

#### Create Collection
```
POST /collections
Authorization: Bearer <token>
Content-Type: application/json

{
  "source": "residential",
  "wasteType": "mixed",
  "quantity": {
    "value": 150,
    "unit": "kg"
  },
  "collectionDate": "2026-02-18T10:00:00Z",
  "vehicle": "VH-001",
  "location": {
    "type": "Point",
    "coordinates": [0, -1],
    "address": "123 Main St"
  }
}
```

#### Update Collection
```
PUT /collections/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "notes": "Collection complete"
}
```

#### Delete Collection
```
DELETE /collections/:id
Authorization: Bearer <token>
```

### Schedules

#### Get All Schedules
```
GET /schedules?status=scheduled&skip=0&limit=10
Authorization: Bearer <token>
```

#### Create Schedule
```
POST /schedules
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Zone A Daily Collection",
  "startDate": "2026-02-18T06:00:00Z",
  "endDate": "2026-02-25T18:00:00Z",
  "assignedVehicle": "VH-001",
  "assignedCollectors": ["user-id-1"],
  "supervisor": "supervisor-id",
  "frequency": "daily",
  "collectionPoints": [...]
}
```

#### Update Schedule Status
```
PATCH /schedules/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active"
}
```

### Disposal Sites

#### Get All Disposal Sites
```
GET /disposal?siteType=landfill&skip=0&limit=10
Authorization: Bearer <token>
```

#### Create Disposal Site
```
POST /disposal
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Central Landfill",
  "siteType": "landfill",
  "location": {
    "type": "Point",
    "coordinates": [2, -3],
    "address": "Outskirts, City"
  },
  "capacity": {
    "total": { "value": 1000, "unit": "tons" },
    "current": { "value": 500, "unit": "tons" }
  }
}
```

#### Update Site Capacity
```
PATCH /disposal/:id/capacity
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentValue": 600
}
```

### Reports

#### Generate Report
```
POST /reports/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "reportType": "monthly",
  "startDate": "2026-02-01",
  "endDate": "2026-02-28",
  "title": "February Waste Collection Report"
}
```

#### Get Reports
```
GET /reports?reportType=monthly&skip=0&limit=10
Authorization: Bearer <token>
```

#### Download Report PDF
```
GET /reports/:id/download
Authorization: Bearer <token>
```

#### Update Report Status
```
PATCH /reports/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved"
}
```

### Users

#### Get All Users
```
GET /users?role=collector&skip=0&limit=10
Authorization: Bearer <token>
```

Requires: admin or manager role

#### Get User by ID
```
GET /users/:id
Authorization: Bearer <token>
```

#### Update User
```
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

#### Update User Role
```
PATCH /users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "supervisor"
}
```

Requires: admin role

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## Rate Limiting

API calls are limited to 100 requests per minute per IP address.

## 📖 Related Documentation

- **[Project Structure](PROJECT_STRUCTURE.md)** - Understand the system architecture
- **[Quick Start](QUICKSTART.md)** - Get started quickly
- **[Contributing](CONTRIBUTING.md)** - How to contribute

## Support

For API support, contact: support@mazuri.com

---

**Documentation**: [Home](README.md) | [Quick Start](QUICKSTART.md) | [Architecture](PROJECT_STRUCTURE.md) | API Reference | [Contributing](CONTRIBUTING.md) | [Files](FILE_MANIFEST.md)
