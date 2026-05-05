// API Routes
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as authController from './controllers/authController.js';
import * as profileController from './controllers/profileController.js';
import * as jobsController from './controllers/jobsController.js';
import { getSkills } from './utils/dataStore.js';
import * as applicationsController from './controllers/applicationsController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads', 'cv');

// Store uploaded CVs on disk (MVP; not production hardened)
const cvUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const userId = req.params.userId || 'unknown-user';
      cb(null, `cv-${userId}-${Date.now()}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf';
    cb(null, isPdf);
  }
});

// ===== AUTH ROUTES =====
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/reset-password', authController.resetPassword);
router.get('/auth/verify', authController.verifySession);

// ===== PROFILE ROUTES =====
router.get('/profile/:userId', profileController.getProfile);
router.put('/profile/:userId', profileController.updateProfile);
router.post('/profile/:userId/upload-cv', cvUpload.single('cv'), profileController.uploadCV);

// ===== JOBS ROUTES =====
router.get('/jobs', jobsController.getAllJobs);
router.get('/jobs/:jobId', jobsController.getJobById);
router.post('/jobs', jobsController.postJob);
router.get('/jobs-filters', jobsController.getFilterOptions);

// ===== SKILLS ROUTE =====
router.get('/skills', (req, res) => {
  res.json({ skills: getSkills() });
});

router.get('/applications', (req, res) => {
  const { employerId, jobId } = req.query;

  if (employerId) {
    const applications = applicationsController.getApplicationsByEmployerId(employerId);
    return res.json({ success: true, applications });
  }

  if (jobId) {
    const applications = applicationsController.getApplicationsByJobId(jobId);
    return res.json({ success: true, applications });
  }

  const applications = applicationsController.getApplications();
  return res.json({ success: true, applications });
});

router.patch('/applications/:applicationId/status', (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!['shortlisted', 'rejected'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status value. Allowed values are "shortlisted" or "rejected".'
    });
  }

  const result = applicationsController.updateApplicationStatus(applicationId, status);
  if (!result.success) {
    const statusCode = result.error === 'Application not found.' ? 404 : 400;
    return res.status(statusCode).json({ success: false, message: result.error });
  }

  return res.json({ success: true, application: result.application });
});

router.post('/applications', (req, res) => {
  try {
    const { jobId, studentId } = req.body;

    // --- 1. Get student profile (from users.json via dataStore or mock) ---
    // MVP: pull from users.json
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8')
    );

    const student = users.find(u => u.id === studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // --- 2. Get job to determine employer ---
    const jobs = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'jobs.json'), 'utf-8')
    );

    const job = jobs.find(j => j.id === jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const employerId = job.employerId;

    // --- 3. Get student CV info ---
    if (!student.profile?.cvFilePath) {
      return res.status(400).json({ message: "Student has no CV uploaded" });
    }
    
    const cv = {
      fileName: student.profile.cvFilename,
      filePath: student.profile.cvFilePath,
    };
    // --- 4. Create and persist application ---
    const application = applicationsController.createApplication(
      jobId,
      employerId,
      student,
      cv
    );

    // --- 5. Respond ---
    res.json({ success: true, application });

  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



export default router;
