# Hirely MVP - Setup Guide

## Project Overview

**Hirely** is a job and internship platform for undergraduate students and fresh graduates in Egypt. This is a **Sprint 1 MVP** — a functional prototype with core features only.

### What's Included
✅ Complete frontend (Next.js) with all pages
✅ Complete backend (Express.js) with API endpoints
✅ Mock data (no database required)
✅ Authentication (mocked for MVP)
✅ Role-based access (student vs employer)
✅ Job posting and browsing with filters
✅ Profile management

### What's NOT Included (Coming in Sprint 2+)
❌ Real database
❌ Job applications
❌ Notifications
❌ Real authentication (JWT/bcrypt)
❌ Admin dashboard
❌ Advanced features

## Installation & Running

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: **http://localhost:5001**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

## Demo Credentials

You can log in with these pre-created accounts:

**Student Account:**
- Email: `ahmed@example.com`
- Password: `password123`

**Employer Account:**
- Email: `startup@example.com`
- Password: `password123`

Demo buttons are available on the login page.

## Project Structure

```
hirely-mvp/
├── backend/
│   ├── server.js                    # Express app
│   ├── routes.js                    # API routes
│   ├── mock-data.js                 # In-memory data
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── jobsController.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── app/
│   │   ├── page.js                  # Landing page
│   │   ├── register/
│   │   ├── login/
│   │   ├── reset-password/
│   │   ├── student/                 # Student pages
│   │   └── employer/                # Employer pages
│   ├── services/api.js              # API client
│   ├── hooks/useAuth.js             # Auth hook
│   ├── package.json
│   ├── .env.local
│   └── README.md
│
├── README.md                        # Main readme
└── SETUP.md                         # This file
```

## Key Features - Student Flow

1. **Landing Page** (`/`)
   - Overview of the platform
   - Links to register or login

2. **Registration** (`/register`)
   - Choose role (student/employer)
   - Enter name, email, password
   - Redirects to dashboard

3. **Dashboard** (`/student/dashboard`)
   - Welcome message
   - Quick links to main features
   - Profile summary

4. **Browse Jobs** (`/student/jobs`)
   - View all job listings
   - Filter by: type (internship/entry-level), location, field
   - See job details

5. **Edit Profile** (`/student/profile`)
   - Add education
   - Select skills
   - Add projects
   - Edit location

6. **Upload CV** (`/student/upload-cv`)
   - Upload PDF (mocked - just stores filename)

## Key Features - Employer Flow

1. **Registration** (`/register?role=employer`)
   - Enter company name, email, password

2. **Dashboard** (`/employer/dashboard`)
   - View all posted jobs
   - Quick action to post new job
   - Company information summary

3. **Company Profile** (`/employer/profile`)
   - Edit company name
   - Add description
   - Set location

4. **Post Job** (`/employer/post-job`)
   - Enter job title, type, field
   - Set location and salary
   - Add description and requirements
   - Job appears immediately in listings

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/reset-password` - Password reset (mocked)
- `GET /api/auth/verify` - Verify session

### Profile
- `GET /api/profile/:userId` - Get profile
- `PUT /api/profile/:userId` - Update profile
- `POST /api/profile/:userId/upload-cv` - Upload CV

### Jobs
- `GET /api/jobs` - List jobs (supports filters)
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs` - Post new job
- `GET /api/jobs-filters` - Get filter options

### Skills
- `GET /api/skills` - Get available skills list

## Important Notes

### Mock Data
- All data is stored in-memory (`backend/mock-data.js`)
- Data resets when backend restarts
- **This is intentional for MVP** - replace with database in Sprint 2

### Authentication
- ⚠️ **Not secure for production**
- Passwords stored in plain text
- Sessions in-memory
- Replace with: JWT tokens, bcrypt hashing, secure cookies

### File Upload
- CV upload stores the PDF file on the backend filesystem
- Replace with cloud storage (Vercel Blob, AWS S3, etc.) in production

## Extending the MVP

### Adding a Database
1. Replace `mock-data.js` with database queries
2. Keep controller structure intact
3. Update API responses

### Adding Job Applications
1. Create `applications` collection/table
2. Add `POST /api/applications` endpoint
3. Add application tracking page
4. Update job detail view

### Adding Authentication
1. Replace mock auth with real JWT
2. Implement bcrypt password hashing
3. Secure session management
4. Add email verification

### Adding Notifications
1. Create notification system
2. Add in-app notification UI
3. Integrate with email service
4. Add notification preferences

## Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend can't connect to backend
- Verify backend is running on `localhost:5001`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Browser console should show API calls in Network tab

### Demo login doesn't work
- Make sure backend is running
- Clear localStorage: `localStorage.clear()` in console
- Try registering a new account instead

## Next Steps

1. Download this folder
2. Start backend: `cd backend && npm install && npm run dev`
3. Start frontend: `cd frontend && npm install && npm run dev`
4. Open `http://localhost:3000`
5. Login with demo credentials or register

Happy building! 🚀
