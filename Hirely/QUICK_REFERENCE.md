# Hirely MVP - Quick Reference Card

## 🚀 Start Here

```bash
# Automated start
./start.sh

# Or manual
cd backend && npm install && npm run dev    # Terminal 1
cd frontend && npm install && npm run dev   # Terminal 2
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

---

## 👤 Demo Accounts

| Type | Email | Password |
|------|-------|----------|
| Student | `ahmed@example.com` | `password123` |
| Employer | `startup@example.com` | `password123` |

Or register a new account on `/register`

---

## 📍 Main Pages

### Public
- `/` - Landing page
- `/register` - Register (choose student/employer)
- `/login` - Login with demo buttons
- `/reset-password` - Password reset UI

### For Students
- `/student/dashboard` - Main dashboard
- `/student/profile` - Edit profile (education, skills, projects)
- `/student/jobs` - Browse & filter jobs
- `/student/upload-cv` - Upload CV

### For Employers
- `/employer/dashboard` - View posted jobs
- `/employer/profile` - Edit company info
- `/employer/post-job` - Create new job posting

---

## 🔌 API Endpoints

All start with `http://localhost:5001/api`

### Auth
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/reset-password
GET    /auth/verify?sessionId=...
```

### Profile
```
GET    /profile/:userId
PUT    /profile/:userId
POST   /profile/:userId/upload-cv
```

### Jobs
```
GET    /jobs                    (+ ?type, ?location, ?field filters)
GET    /jobs/:jobId
POST   /jobs
GET    /jobs-filters
```

### Skills
```
GET    /skills
```

---

## 📁 Key Files

### Backend
- `backend/server.js` - Express app
- `backend/routes.js` - All API routes
- `backend/mock-data.js` - Sample data (3 users, 6 jobs)
- `backend/controllers/` - Auth, Profile, Jobs logic

### Frontend
- `frontend/app/page.js` - Landing page
- `frontend/services/api.js` - API client
- `frontend/hooks/useAuth.js` - Auth state
- `frontend/app/student/` - Student pages
- `frontend/app/employer/` - Employer pages

---

## 🧪 Quick Test Flows

### Student Flow
1. Go to `/register?role=student`
2. Fill in details, click "Create Account"
3. Lands on `/student/dashboard`
4. Click "Browse Jobs" → see filtered job listings
5. Click "Edit Profile" → add education & skills
6. Click "Upload CV" → see success message

### Employer Flow
1. Go to `/register?role=employer`
2. Fill in details, click "Create Account"
3. Lands on `/employer/dashboard`
4. Click "Post a New Job"
5. Fill form, submit → job appears in listings
6. Click "Company Profile" → edit info

### Login Test
1. Go to `/login`
2. Click "Demo: Student" button
3. Lands on student dashboard
4. Click "Logout" button
5. Redirects to login page

---

## 🛠️ Common Tasks

### Running just frontend
```bash
cd frontend
npm run dev
```

### Running just backend
```bash
cd backend
npm run dev
```

### Check API is working
```bash
curl http://localhost:5001/api/health
curl http://localhost:5001/api/skills
```

### Reset all data
```
Kill backend (Ctrl+C)
Restart backend: cd backend && npm run dev
(All in-memory data resets)
```

### Check API responses
Open browser DevTools (F12) → Network tab → Check API calls

---

## 💾 Mock Data Included

**Users:**
- Ahmed Hassan (student)
- Fatima Mohamed (student)
- TechStartup Inc (employer)

**Jobs:**
- Junior Frontend Developer
- Content Marketing Intern
- Data Analytics Intern
- Business Development Intern
- UI/UX Design Intern
- Backend Developer

**Skills:**
20 pre-loaded skills (JavaScript, React, Python, Excel, SQL, etc.)

---

## ⚙️ Configuration

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Backend (server.js)
```javascript
const PORT = process.env.PORT || 5001;
```

---

## 📚 Documentation

- **README.md** - Full project overview
- **SETUP.md** - Detailed setup & troubleshooting
- **PROJECT_SUMMARY.md** - Development summary
- **frontend/README.md** - Frontend architecture
- **backend/README.md** - Backend API details
- **QUICK_REFERENCE.md** - This file

---

## ✅ What Works

✅ User registration (student & employer)
✅ Login & logout
✅ Profile editing
✅ Job posting
✅ Job browsing with filters
✅ CV upload UI
✅ Role-based dashboards
✅ Session management
✅ Error messages
✅ Loading states

---

## ⚠️ What's Mocked (MVP)

🔐 **Authentication** - Plain text, in-memory
💾 **Database** - All data in-memory
📁 **File uploads** - Filename only (no actual upload)
📧 **Email** - Password reset doesn't send emails
📱 **Applications** - Not yet implemented

---

## 🚨 Troubleshooting

### Frontend won't connect to backend
- [ ] Is backend running on `localhost:5001`?
- [ ] Check `.env.local` has correct API URL
- [ ] Check Network tab in DevTools for CORS errors

### Can't login with demo account
- [ ] Is backend running?
- [ ] Clear localStorage: `localStorage.clear()` in console
- [ ] Try registering a new account

### Backend crashes
- [ ] Check for port conflicts (5001 in use?)
- [ ] Reinstall: `rm -rf node_modules && npm install`
- [ ] Check error messages in terminal

### Jobs don't appear after posting
- [ ] Refresh page
- [ ] Check Network tab for POST success
- [ ] Check browser console for errors

---

## 📞 Need Help?

1. Read [SETUP.md](./SETUP.md)
2. Check relevant README files
3. Inspect browser console (F12)
4. Check server terminal for errors
5. Review code comments (all marked with `// TODO` or `// Mock`)

---

## 🎯 Next Steps

1. **Try the app** - Register, post a job, browse listings
2. **Read the code** - Understand structure and patterns
3. **Plan Sprint 2** - Database, real auth, applications
4. **Deploy** - Frontend to Vercel, backend to Railway
5. **Extend** - Add features following existing patterns

---

**Happy building! 🚀**

Last updated: April 2026
Version: 1.0.0 (Sprint 1 MVP)
