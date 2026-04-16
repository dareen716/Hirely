# Hirely Backend - Sprint 1 MVP

Express.js backend with mock data and simplified authentication.

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:5001`

## Architecture

```
backend/
├── server.js              # Express app setup
├── routes.js              # API routes
├── mock-data.js          # In-memory mock data (will be replaced by DB)
├── controllers/          # Business logic
│   ├── authController.js
│   ├── profileController.js
│   └── jobsController.js
└── package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register student/employer
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/reset-password` - Password reset (mocked)
- `GET /api/auth/verify?sessionId=...` - Verify session

### Profile
- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/:userId` - Update profile
- `POST /api/profile/:userId/upload-cv` - Upload CV

### Jobs
- `GET /api/jobs` - List all jobs (supports ?type, ?location, ?field filters)
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs` - Post new job (employer only)
- `GET /api/jobs-filters` - Get available filter options

### Skills
- `GET /api/skills` - Get list of available skills

## Mock Data

All data is stored in-memory in `mock-data.js`:
- 3 users (2 students + 1 employer)
- 6 job listings
- 20 shared skills

Data resets on server restart. **Replace with database in Sprint 2.**

## Authentication

⚠️ **Mock Implementation**
- Sessions stored in-memory
- No password hashing
- No JWT tokens

**Replace with real auth in production:**
- Use bcrypt for passwords
- Implement JWT tokens
- Add database storage
- Add HTTPS

## Notes

- All endpoints marked with `// Mock implementation` need database later
- Comments indicate where real database queries would go
- No validation beyond basic checks
