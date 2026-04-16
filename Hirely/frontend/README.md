# Hirely Frontend - Sprint 1 MVP

Next.js frontend for the Hirely job platform.

## Setup

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000`

## Architecture

```
frontend/
├── app/
│   ├── page.js                      # Landing page
│   ├── register/
│   ├── login/
│   ├── reset-password/
│   ├── student/
│   │   ├── dashboard/
│   │   ├── profile/                 # Edit profile
│   │   ├── upload-cv/
│   │   └── jobs/                    # Browse & filter jobs
│   └── employer/
│       ├── dashboard/
│       ├── profile/                 # Edit company info
│       └── post-job/
├── components/                      # Reusable components
├── hooks/
│   └── useAuth.js                   # Auth state management
├── services/
│   └── api.js                       # API calls to backend
├── globals.css                      # Global styles
└── layout.js                        # Root layout
```

## Pages

### Public Pages
- `/` - Landing page with role selection
- `/register` - Student/Employer registration
- `/login` - Login with demo accounts
- `/reset-password` - Password reset (mocked)

### Student Pages
- `/student/dashboard` - Dashboard with quick actions
- `/student/jobs` - Browse jobs with filters (type, location, field)
- `/student/profile` - Edit education, skills, projects
- `/student/upload-cv` - Upload PDF CV

### Employer Pages
- `/employer/dashboard` - View posted jobs
- `/employer/profile` - Edit company information
- `/employer/post-job` - Create and post jobs

## API Integration

Frontend communicates with backend via `/services/api.js`:

```javascript
// Authentication
authService.register(email, password, name, role)
authService.login(email, password)
authService.logout(sessionId)
authService.resetPassword(email)

// Profile
profileService.getProfile(userId)
profileService.updateProfile(userId, updates)
profileService.uploadCV(userId, file)

// Jobs
jobsService.getAllJobs(filters)
jobsService.getJobById(jobId)
jobsService.postJob(jobData)
jobsService.getFilterOptions()

// Skills
skillsService.getSkills()
```

## Authentication Flow

1. User registers/logs in
2. Backend returns `sessionId`
3. Frontend stores in `localStorage`
4. `useAuth` hook manages auth state
5. Protected pages check auth before rendering

⚠️ **Mock Implementation** - Replace with real JWT/session management in production

## Features

✅ User registration (student/employer)
✅ Login with demo accounts
✅ Role-based access control
✅ Student profile editing
✅ Skill selection from shared list
✅ Project management
✅ CV upload
✅ Job browsing with filters
✅ Job posting by employers
✅ Company profile management

## Future Enhancements

- Real authentication with JWT
- Job application system
- Application status tracking
- Notification system
- Admin dashboard
- Email notifications
- Advanced search
- Saved jobs
- User reviews/ratings
- Job matching algorithm

## Notes

- All API calls go to `http://localhost:5001/api` (backend)
- Session stored in localStorage (replace with secure cookies in production)
- CV upload saves the PDF to the backend filesystem
- Authentication is basic (no password hashing/JWT in MVP)
