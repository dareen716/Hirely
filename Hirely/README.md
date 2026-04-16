# 🎓 Hirely MVP - Sprint 1

A **job and internship platform** for undergraduate students and fresh graduates in Egypt. This is a **fully functional prototype** with core features only — ready to extend with a database and additional features in future sprints.

---

## ⚡ Quick Start

### Option 1: Automated Setup (Mac/Linux)
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**Frontend**: http://localhost:3000  
**Backend**: http://localhost:5001

---

## 🔐 Demo Credentials

Try these accounts (no registration needed):

| Role | Email | Password |
|------|-------|----------|
| Student | `ahmed@example.com` | `password123` |
| Employer | `startup@example.com` | `password123` |

Demo login buttons available on `/login` page.

---

## 📁 Project Structure

```
hirely-mvp/
├── frontend/                    # Next.js frontend (React)
│   ├── app/
│   │   ├── page.js             # Landing page
│   │   ├── register/           # Registration flow
│   │   ├── login/              # Login & password reset
│   │   ├── student/            # Student pages (dashboard, profile, jobs, CV upload)
│   │   └── employer/           # Employer pages (dashboard, profile, post job)
│   ├── services/api.js         # API client (calls backend)
│   ├── hooks/useAuth.js        # Authentication state management
│   └── package.json
│
├── backend/                     # Express.js backend
│   ├── server.js               # Express app setup
│   ├── routes.js               # API route definitions
│   ├── mock-data.js            # In-memory data (2 students, 1 employer, 6 jobs)
│   ├── controllers/
│   │   ├── authController.js   # Register, login, password reset
│   │   ├── profileController.js # Profile CRUD
│   │   └── jobsController.js   # Job listings and posting
│   └── package.json
│
├── README.md                    # This file
├── SETUP.md                     # Detailed setup guide
├── start.sh                     # Quick start script
└── .gitignore
```

---

## ✨ Features

### 🎓 For Students
- ✅ Register with email/password
- ✅ View all job listings
- ✅ Filter jobs by: type (internship/entry-level), location, field
- ✅ Edit profile (education, skills, location, projects)
- ✅ Upload CV (PDF — stored on server filesystem)
- ✅ Dashboard with profile summary

### 🏢 For Employers
- ✅ Register company account
- ✅ Post internship & entry-level jobs
- ✅ Edit company profile and description
- ✅ View all posted jobs
- ✅ Dashboard with job management

### 🔑 For Everyone
- ✅ Secure login/logout
- ✅ Password reset (mocked email)
- ✅ Role-based access control
- ✅ Session management (localStorage)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Express.js, Node.js |
| Database | None (in-memory mock data) |
| Authentication | Mocked sessions |
| File Storage | Stored on server filesystem |

---

## 📡 API Endpoints

All endpoints return JSON and are available at `http://localhost:5001/api`

### Authentication
```
POST   /api/auth/register              # Register student/employer
POST   /api/auth/login                 # Login
POST   /api/auth/logout                # Logout
POST   /api/auth/reset-password        # Password reset (mocked)
GET    /api/auth/verify?sessionId=...  # Verify session
```

### Profile Management
```
GET    /api/profile/:userId            # Get profile
PUT    /api/profile/:userId            # Update profile
POST   /api/profile/:userId/upload-cv  # Upload CV
```

### Job Listings
```
GET    /api/jobs                       # List all jobs (supports ?type, ?location, ?field filters)
GET    /api/jobs/:jobId                # Get job details
POST   /api/jobs                       # Post new job (employer only)
GET    /api/jobs-filters               # Get available filter options
```

### Skills
```
GET    /api/skills                     # Get all available skills
```

---

## 🗂️ Mock Data

The app includes pre-loaded mock data in `backend/mock-data.js`:
- **2 students** with profiles
- **1 employer** with company info
- **6 job listings** across different fields and locations
- **20 shared skills** for selection

Data is **stored in-memory** and resets when the backend restarts.

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Frontend only
cd frontend
npm run build
# Then connect to Vercel in the dashboard

# For full deployment, also set backend on a service like:
# - Railway.app
# - Render.com
# - Heroku
```

### Environment Variables
Frontend needs `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## ⚠️ Important Notes

### What's Mocked (MVP Only)
- 🔐 **Authentication**: Plain text passwords, in-memory sessions (NOT secure)
- 💾 **Database**: All data in-memory, lost on server restart
- 📁 **File Upload**: CV upload stores the PDF on the backend and saves the filename in the student profile
- 📧 **Email**: Password reset doesn't send emails
- 📱 **Applications**: Job applications not yet implemented

### Ready for Production? No
This is a **prototype MVP** — do NOT deploy to production without:
- Real database (PostgreSQL, MongoDB, etc.)
- Password hashing (bcrypt)
- JWT authentication
- Secure session management
- HTTPS only
- Input validation & sanitization
- Error handling
- Rate limiting
- CORS configuration

---

## 🎯 Sprint 1 Scope (Completed)

✅ User registration (student & employer)
✅ Login & logout
✅ Role-based dashboards
✅ Profile management
✅ Job posting & browsing
✅ Job filtering
✅ CV upload UI
✅ Password reset UI

---

## 🔮 Sprint 2+ (Out of Scope)

❌ Real database integration
❌ Job applications & tracking
❌ Notifications (email/in-app)
❌ Real authentication (JWT/bcrypt)
❌ Admin dashboard
❌ Email system
❌ Saved jobs / favorites
❌ Skill matching algorithm
❌ Advanced search
❌ Mobile optimization

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup & troubleshooting guide
- **[frontend/README.md](./frontend/README.md)** - Frontend architecture
- **[backend/README.md](./backend/README.md)** - Backend architecture

---

## 🤝 Contributing

This is a learning project. To extend it:

1. **Add database**: Replace `mock-data.js` with real queries
2. **Implement features**: Follow existing controller/route patterns
3. **Add validation**: Enhance input sanitization
4. **Improve UI**: Modify components in `/app`

---

## 📝 License

This is a demonstration project for learning purposes.

---

**Happy building! 🚀** Ready to extend? Check out [SETUP.md](./SETUP.md) for detailed instructions.
