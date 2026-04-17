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

router.post('/applications', async (req, res) => {
  const { studentID, jobID } = req.body;

  try {
    // Step 1: Get student profile (mock for now)
    const studentProfile = { id: studentID, name: "Test Student" };
    if (!studentProfile) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Step 2: Save application (mock DB insert)
    const application = {
      id: Date.now(),
      studentID,
      jobID,
      date: new Date()
    };
    console.log("Application saved:", application);

    // Step 3: Notify student (mock notification)
    console.log(`Notification: Student ${studentID} applied for Job ${jobID}`);

    // Step 4: Respond to frontend
    res.json({ success: true, application });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



export default router;
