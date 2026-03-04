# Mazuri Waste Management System - Quick Start Guide

**📚 [Back to Main](README.md)** | [Project Structure](PROJECT_STRUCTURE.md) | [API Reference](API.md) | [Contributing](CONTRIBUTING.md)

## 🚀 Getting Started (5 Minutes)

### 1. Prerequisites Check
```bash
node -v          # Should be v14 or higher
npm -v           # Should be v6 or higher
mongod --version # Should be installed (or use MongoDB Atlas)
```

### 2. Clone & Install
```bash
cd /path/to/MAZURI-WASTE-MANAGEMENT-AND-CONTROL-SYSTEM
chmod +x setup.sh
./setup.sh
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

Key variables to set:
```
MONGODB_URI=mongodb://localhost:27017/mazuri
JWT_SECRET=your_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
EMAIL_FROM=your-email@gmail.com
```

### 4. Start Development Server
```bash
# Terminal 1 - Backend API (http://localhost:5000)
npm run dev

# Terminal 2 - Frontend React (http://localhost:3000)
npm run client

# Or run both together
npm run dev & npm run client
```

### 5. Seed Database (Optional)
```bash
npm run seed
```

## 📱 Default Login Credentials
```
Email: admin@mazuri.com
Password: password123
```

## 🐳 Using Docker (Alternative)
```bash
docker-compose up --build
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 📚 Documentation
- **API Endpoints**: See [API.md](API.md)
- **Project Structure**: See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Full README**: See [README.md](README.md)

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Main Features
- `GET /api/collections` - List waste collections
- `GET /api/schedules` - List collection schedules
- `GET /api/disposal` - List disposal sites
- `GET /api/reports` - List reports
- `GET /api/users` - List users

See [API.md](API.md) for complete endpoint documentation.

## 🗂️ Project Structure Overview

```
Backend:
├── models/          - Database schemas
├── routes/          - API routes
├── controllers/     - Business logic
├── middleware/      - Auth & validation
├── config/          - Configuration
└── utils/           - Helper utilities

Frontend:
├── pages/           - Page components
├── components/      - Reusable components
├── services/        - API client
├── store/           - Redux state
└── styles/          - CSS & Tailwind
```

## 🛠️ Common Commands

```bash
# Backend
npm install               # Install dependencies
npm run dev              # Run with hot reload (nodemon)
npm start                # Run production server
npm test                 # Run tests
npm run seed             # Seed database
npm run generate-report  # Generate sample report

# Frontend
cd client
npm install              # Install dependencies
npm start                # Start dev server
npm run build            # Build for production
npm test                 # Run tests
```

## 🔒 User Roles & Permissions

| Role | Description | Access |
|------|-------------|--------|
| Admin | Full system access | All features |
| Manager | Scheduling & reporting | Collections, Schedules, Reports, Users |
| Collector | Collection operations | Collections, assigned Schedules |
| Supervisor | Team monitoring | Collections, Schedules, Reports |
| Viewer | Read-only access | Dashboard, Reports (read-only) |

## 📊 Dashboard Features

- Real-time statistics
- Collections & disposal trends
- Performance metrics
- System health status
- Recent activity log

## 📖 Next Steps

- **[Explore Project Structure](PROJECT_STRUCTURE.md)** - Learn about the system architecture
- **[Read API Documentation](API.md)** - Understand all available endpoints
- **[Check File Organization](FILE_MANIFEST.md)** - See complete file breakdown

## 💾 Database

Uses MongoDB with the following collections:
- **users** - System users
- **wastecollections** - Waste collection records
- **schedules** - Collection schedules
- **disposalsites** - Disposal site management
- **reports** - Generated reports

## 📧 Email Configuration

To enable email notifications:
1. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` in `.env`
2. Set `EMAIL_FROM` to your email address
3. Enable notifications in schedules/settings

### Using Gmail:
1. Create an App Password in Google Account
2. Use Gmail in `SMTP_HOST`
3. Input App Password in `SMTP_PASSWORD`

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
# Option 1: Local MongoDB
mongod

# Option 2: Use MongoDB Atlas (update MONGODB_URI in .env)
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/mazuri
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill the process
lsof -i :5000
kill -9 <PID>
```

### Dependencies Installation Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📱 Frontend Features

✅ Responsive design (desktop, tablet, mobile)
✅ Dark/Light mode ready
✅ Real-time data updates
✅ Offline support (with service workers - future)
✅ Accessible UI components

## 📈 Performance Tips

- Use MongoDB Atlas for cloud database
- Enable Redis caching (future enhancement)
- Implement pagination for large datasets
- Optimize images and assets
- Use CDN for static files

## 🚀 Deployment Checklist

- [ ] Set up MongoDB (Atlas recommended)
- [ ] Configure all environment variables
- [ ] Set secure JWT secrets
- [ ] Configure email service
- [ ] Set NODE_ENV=production
- [ ] Build frontend: `npm run build`
- [ ] Test API endpoints
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS origins
- [ ] Set up logging
- [ ] Configure backup strategy

## 📞 Support

- **Docs**: See README.md and API.md
- **Issues**: Create GitHub issue
- **Email**: support@mazuri.com
- **Contributing**: See CONTRIBUTING.md

## 🎓 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📄 License

MIT License - See LICENSE file for details

## 🎉 You're Ready!

```bash
# Start developing
npm run dev

# Open browser
http://localhost:5000
http://localhost:3000
```

Happy coding! 🚀

---

**Documentation**: [Home](README.md) | Quick Start | [Architecture](PROJECT_STRUCTURE.md) | [API](API.md) | [Contributing](CONTRIBUTING.md) | [Files](FILE_MANIFEST.md)
