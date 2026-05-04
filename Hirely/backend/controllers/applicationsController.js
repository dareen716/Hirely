import fs from 'fs';
import path from 'path';

import {
  getApplications as loadApplications,
  saveApplications
} from '../utils/dataStore.js';


import { fileURLToPath } from 'url';
``

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
``


// Path to the applications.json file
const applicationsFilePath = path.join(__dirname, '../data/applications.json');

/**
 * Reads all applications from the data store.
 * @returns {Array} List of applications.
 */

const readApplications = () => loadApplications();
const writeApplications = (applications) =>
  saveApplications(applications);



/**
 * Creates a new job application.
 * @param {string} jobId - The ID of the job being applied for.
 * @param {string} employerId - The ID of the employer offering the job.
 * @param {Object} student - Snapshot of the student profile (id, name, email, education, skills, projects).
 * @param {Object} cv - CV details (fileName and filePath).
 * @returns {Object} The newly created application.
 */
const createApplication = (jobId, employerId, student, cv) => {
  const applications = readApplications();

  const newApplication = {
    id: `application-${Date.now()}`, // Unique ID for the application
    jobId,
    employerId,
    studentId: student.id,
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      education: student.education,
      skills: student.skills,
      projects: student.projects,
    },
    cv: {
      fileName: cv.fileName,
      filePath: cv.filePath,
    },
    status: 'applied', // Default status
    appliedAt: new Date().toISOString(), // Timestamp
  };

  applications.push(newApplication);
  writeApplications(applications);

  return newApplication;
};

/**
 * Retrieves all job applications.
 * @returns {Array} List of all applications.
 */
const getApplications = () => {
  return readApplications();
};

/**
 * Retrieves applications by job ID.
 * @param {string} jobId - The ID of the job.
 * @returns {Array} List of applications for the specified job.
 */
const getApplicationsByJobId = (jobId) => {
  const applications = readApplications();
  return applications.filter((application) => application.jobId === jobId);
};

/**
 * Retrieves applications by student ID.
 * @param {string} studentId - The ID of the student.
 * @returns {Array} List of applications for the specified student.
 */
const getApplicationsByStudentId = (studentId) => {
  const applications = readApplications();
  return applications.filter((application) => application.studentId === studentId);
};

export {
    createApplication,
    getApplications,
    getApplicationsByJobId,
    getApplicationsByStudentId,
  };
  ``