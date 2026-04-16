# Hirely MVP - Verification Checklist

Use this checklist to verify the MVP is working correctly after setup.

---

## ✅ Pre-Flight Checks

- [ ] Node.js v16+ installed
- [ ] npm installed
- [ ] Two terminal windows open
- [ ] Port 5001 available (backend)
- [ ] Port 3000 available (frontend)
- [ ] Internet connection available

---

## 🚀 Installation Verification

### Backend
```bash
cd backend
npm install
```
- [ ] No errors during npm install
- [ ] node_modules folder created
- [ ] package-lock.json created

### Frontend
```bash
cd frontend
npm install
```
- [ ] No errors during npm install
- [ ] node_modules folder created
- [ ] package-lock.json created

---

## 🔧 Running the Application

### Start Backend
```bash
cd backend
npm run dev
```
Expected output:
- [ ] `✓ Backend running on http://localhost:5001`
- [ ] `✓ API endpoints: http://localhost:5001/api`
- [ ] No error messages

### Start Frontend
```bash
cd frontend
npm run dev
```
Expected output:
- [ ] `> next dev`
- [ ] ▲ Next.js dev server running
- [ ] Ready in X.XXs
- [ ] No error messages

---

## 🌐 Browser Verification

### Open Application
Navigate to `http://localhost:3000`

#### Landing Page (`/`)
- [ ] Hirely logo visible
- [ ] "Launch Your Career" heading visible
- [ ] "I'm a Student" and "I'm Hiring" buttons visible
- [ ] Navigation bar at top with Login/Get Started
- [ ] 3 feature cards displayed
- [ ] Professional styling applied
- [ ] No console errors

---

## 🔐 Authentication Verification

### Test Demo Login
Go to `/login`
- [ ] Email and password input fields visible
- [ ] "Demo: Student (Ahmed)" button visible
- [ ] "Demo: Employer" button visible
- [ ] "Forgot password?" link visible
- [ ] "Create account" link visible

#### Demo Student Login
- [ ] Click "Demo: Student (Ahmed)" button
- [ ] Button shows "Signing in..." state
- [ ] Redirected to `/student/dashboard`
- [ ] Page loads without errors

#### Demo Employer Login  
- [ ] Go back to login page
- [ ] Click "Demo: Employer" button
- [ ] Redirected to `/employer/dashboard`
- [ ] Page loads without errors

### Test Registration
Go to `/register`
- [ ] "I am a:" toggle with Student/Employer options
- [ ] Form has Name, Email, Password, Confirm Password fields
- [ ] "Create Account" button present
- [ ] Cannot submit with empty fields
- [ ] Can toggle between student and employer

#### Register as Student
- [ ] Fill in form with test data
- [ ] All fields required message if empty
- [ ] Successful registration redirects to student dashboard
- [ ] New user data persists in session

#### Register as Employer
- [ ] Repeat for employer role
- [ ] Redirects to employer dashboard instead

### Test Logout
From any authenticated page
- [ ] "Logout" button visible
- [ ] Click logout
- [ ] Redirected to login page
- [ ] Session cleared (refresh shows login page)

---

## 👨‍💼 Student Dashboard Verification

Navigate to `/student/dashboard` (login as student first)

#### Dashboard Content
- [ ] Welcome message with student name
- [ ] "Browse Opportunities" link
- [ ] "Edit Profile" link
- [ ] "Upload CV" link
- [ ] Profile summary section below with:
  - [ ] Education field
  - [ ] Location field
  - [ ] CV field
  - [ ] Skills section

#### Navigation
- [ ] Dashboard link works
- [ ] Browse Jobs link works
- [ ] Profile link works
- [ ] Logout button works

---

## 📚 Student Profile Verification

Navigate to `/student/profile` (as logged-in student)

#### Profile Form Elements
- [ ] Education input field
- [ ] Location input field
- [ ] Skills section with available skills
- [ ] Projects section with add/remove buttons
- [ ] Save Changes button

#### Functionality
- [ ] Can type in education field
- [ ] Can type in location field
- [ ] Can select/deselect multiple skills
- [ ] Can add projects with title and description
- [ ] Can remove added projects
- [ ] Click "Save Changes" shows success message
- [ ] Profile updates persist after refresh

#### Skills Selection
- [ ] All 20+ skills visible
- [ ] Can click to select skills
- [ ] Selected skills highlight in blue
- [ ] Can toggle skills on/off
- [ ] Multiple selections work

---

## 📄 CV Upload Verification

Navigate to `/student/upload-cv` (as student)

#### Page Elements
- [ ] "Upload CV" heading visible
- [ ] File input area visible
- [ ] "Click to upload or drag and drop" text visible
- [ ] "PDF files only" note visible
- [ ] Upload button visible

#### File Upload
- [ ] Can click file input area
- [ ] File picker dialog opens
- [ ] Only PDF files selectable
- [ ] Selected file shows in "Selected:" text
- [ ] Click "Upload CV" button
- [ ] Success message appears
- [ ] Current CV field shows uploaded filename

---

## 💼 Job Listings Verification

Navigate to `/student/jobs` (as student)

#### Job Display
- [ ] Multiple job listings visible
- [ ] Each job shows:
  - [ ] Job title
  - [ ] Company name
  - [ ] Job type badge (internship/entry-level)
  - [ ] Field badge
  - [ ] Location with icon
  - [ ] Salary range
  - [ ] View Details button

#### Filter Sidebar
- [ ] Type dropdown (All Types selected by default)
- [ ] Location dropdown
- [ ] Field dropdown
- [ ] "Clear Filters" button (hidden if no filters)

#### Filtering
- [ ] Filter by Type works (list updates)
- [ ] Filter by Location works (list updates)
- [ ] Filter by Field works (list updates)
- [ ] Multiple filters combined work
- [ ] "Clear Filters" button resets all
- [ ] URL updates with filter params

#### Job Cards
- [ ] At least 6 jobs displayed
- [ ] Jobs show different types, fields, locations
- [ ] View Details buttons present
- [ ] Click View Details is disabled with tooltip

---

## 🏢 Employer Dashboard Verification

Navigate to `/employer/dashboard` (login as employer first)

#### Dashboard Content
- [ ] Welcome message with employer name
- [ ] Job count displayed (e.g., "1 Active Job Postings")
- [ ] "Post a New Job" button/card visible
- [ ] Company Information section showing:
  - [ ] Company name
  - [ ] Location
  - [ ] Description
  - [ ] "Edit Company Profile" link

#### Job Listings Section
- [ ] "Your Job Postings" heading
- [ ] Posted jobs listed (if any)
- [ ] Each job shows title, description, type, field, location
- [ ] If no jobs: "No job postings yet" message with link to post job

#### Navigation
- [ ] Dashboard link works
- [ ] Post Job link works
- [ ] Company Profile link works
- [ ] Logout button works

---

## 🏢 Employer Profile Verification

Navigate to `/employer/profile` (as employer)

#### Form Elements
- [ ] Company Name input field (required)
- [ ] Location input field
- [ ] Company Description textarea
- [ ] Save Profile button

#### Functionality
- [ ] Can edit company name
- [ ] Can edit location
- [ ] Can edit description
- [ ] Click "Save Profile" shows success message
- [ ] Changes persist after page refresh

---

## ➕ Post Job Verification

Navigate to `/employer/post-job` (as employer)

#### Form Elements
- [ ] Job Title input (required)
- [ ] Job Type dropdown (internship/entry-level)
- [ ] Field dropdown (Technology, Marketing, etc.)
- [ ] Location dropdown (Cairo, Giza, etc.)
- [ ] Salary Range input
- [ ] Job Description textarea (required)
- [ ] Required Skills textarea (optional)
- [ ] Post Job button

#### Form Validation
- [ ] Cannot submit with empty title
- [ ] Cannot submit with empty description
- [ ] Can submit other fields empty
- [ ] Error message shows if validation fails

#### Posting a Job
- [ ] Fill all required fields
- [ ] Click "Post Job"
- [ ] Shows "Posting Job..." state
- [ ] Success message appears
- [ ] Redirects to employer dashboard
- [ ] New job appears in job listings at top

#### Job Appears in Listings
- [ ] Go to `/student/jobs`
- [ ] New job visible in list
- [ ] All details match what was posted

---

## 🔌 API Verification

### Test Backend Health
```bash
curl http://localhost:5001/api/health
```
- [ ] Returns: `{ "status": "Backend is running" }`

### Test Get Skills
```bash
curl http://localhost:5001/api/skills
```
- [ ] Returns array of skills
- [ ] Contains at least 20 skills

### Test Get Jobs
```bash
curl http://localhost:5001/api/jobs
```
- [ ] Returns array of jobs
- [ ] Contains 6+ jobs with all properties

### Test Get Filter Options
```bash
curl http://localhost:5001/api/jobs-filters
```
- [ ] Returns: `{ "types": [...], "locations": [...], "fields": [...] }`

### Check in DevTools Network Tab
Go to any page and check Network tab (F12)
- [ ] API calls show in Network tab
- [ ] All requests return 200 status (unless intentionally testing errors)
- [ ] Response JSON is valid
- [ ] No 404 or 500 errors

---

## 🎯 User Flow Verification

### Complete Student Journey
1. [ ] Go to `/`
2. [ ] Click "I'm a Student"
3. [ ] Fill registration form
4. [ ] Submit → lands on dashboard
5. [ ] Click "Edit Profile"
6. [ ] Add education, select skills, add project
7. [ ] Save → success message
8. [ ] Click "Upload CV"
9. [ ] Select PDF file, upload
10. [ ] Click "Browse Jobs"
11. [ ] Filter by location → list updates
12. [ ] Go back to dashboard
13. [ ] Logout → redirected to login
14. [ ] Login with same credentials
15. [ ] Profile data still there
16. [ ] Logout

### Complete Employer Journey
1. [ ] Go to `/`
2. [ ] Click "I'm Hiring"
3. [ ] Register company
4. [ ] Lands on dashboard
5. [ ] Click "Company Profile"
6. [ ] Add company description
7. [ ] Save → success message
8. [ ] Click "Post a New Job"
9. [ ] Fill job posting form
10. [ ] Submit → redirected to dashboard
11. [ ] New job appears in listing
12. [ ] Job appears in student job browse
13. [ ] Filter works on job
14. [ ] Logout → redirected to login
15. [ ] Login again
16. [ ] Job still there

---

## 🎨 UI/UX Verification

### Design Elements
- [ ] Consistent color scheme (blue primary color)
- [ ] Professional layout and spacing
- [ ] Readable typography
- [ ] Consistent navigation bar across pages
- [ ] Buttons have hover states
- [ ] Responsive design (try resizing window)

### Mobile Responsiveness
Resize browser to mobile width (375px)
- [ ] Navigation adapts
- [ ] Forms stack vertically
- [ ] Buttons readable
- [ ] No horizontal scroll
- [ ] Content accessible on mobile

### Error States
- [ ] Form validation shows errors
- [ ] Failed login shows error message
- [ ] API errors show user-friendly message
- [ ] Loading states show spinner/text

### Success States
- [ ] Save operations show success message
- [ ] Messages auto-hide after 3 seconds
- [ ] Redirects work after successful actions

---

## 💾 Data Persistence Verification

### Session Persistence
- [ ] Login as student
- [ ] Refresh page → still logged in
- [ ] Close and reopen tab → still logged in
- [ ] Navigate away and back → still logged in

### Profile Data Persistence
- [ ] Edit profile and save
- [ ] Refresh page → changes still there
- [ ] Logout and login again → changes still there

### Job Data Persistence (in session)
- [ ] Post a job as employer
- [ ] Go to student job list → job there
- [ ] Refresh page → job still there
- [ ] (Note: Restarting backend will reset all data)

---

## ⚡ Performance Checks

### Page Load Times
- [ ] Landing page loads in < 2 seconds
- [ ] Authenticated pages load in < 1 second
- [ ] Job listing loads with filters responsive
- [ ] No lag when scrolling

### Responsiveness
- [ ] Buttons respond immediately on click
- [ ] Forms submit without delay
- [ ] API calls complete within 500ms
- [ ] No UI freezing

---

## 🔍 Browser Console Checks

Open DevTools (F12) → Console tab
- [ ] No red error messages
- [ ] No warnings about React
- [ ] API calls show in Network tab
- [ ] No CORS errors
- [ ] No undefined variable errors

---

## 🐛 Common Issues Resolution

### Issue: Cannot connect to backend
- [ ] Backend running on localhost:5001?
- [ ] No CORS errors in console?
- [ ] Check .env.local API URL correct?
- [ ] Try clearing browser cache

### Issue: Login fails with demo account
- [ ] Backend running?
- [ ] Try clearing localStorage: `localStorage.clear()`
- [ ] Try registering new account instead

### Issue: Jobs don't update after posting
- [ ] Refresh page (F5)
- [ ] Check Network tab for successful POST
- [ ] Check browser console for errors

### Issue: Profile changes not saving
- [ ] Check Network tab for successful PUT
- [ ] Try saving again
- [ ] Check browser console

---

## ✅ Final Verification

- [ ] All pages accessible
- [ ] Authentication working
- [ ] CRUD operations working (Create profiles, Read jobs, Update profiles)
- [ ] Filtering working
- [ ] No major console errors
- [ ] Responsive design working
- [ ] Both users roles working (student/employer)
- [ ] Demo data loaded correctly
- [ ] Navigation between pages smooth
- [ ] Logout clears session properly

---

## 📋 Sign-Off Checklist

System Owner: _________________ Date: _________________

- [ ] All items above verified
- [ ] App running without critical errors
- [ ] Ready for development/deployment
- [ ] Documentation is complete
- [ ] Code structure is sound

### Notes:
```
_________________________________________________________
_________________________________________________________
_________________________________________________________
```

---

## 🎉 Success!

If all checkboxes are checked, **Hirely MVP is fully verified and working!**

---

**Total Tests**: 100+
**Estimated Time**: 30-45 minutes
**Difficulty**: Easy
**Requirements**: Just run the app!

Good luck! 🚀
