// API Service - Communicates with backend
// Mock backend runs on http://localhost:5001
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE
});

// Auth services
export const authService = {
  register: (email, password, name, role) =>
    api.post('/auth/register', { email, password, name, role }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  logout: (sessionId) =>
    api.post('/auth/logout', { sessionId }),
  
  verifySession: (sessionId) =>
    api.get(`/auth/verify?sessionId=${sessionId}`),
  
  resetPassword: (email) =>
    api.post('/auth/reset-password', { email })
};

// Profile services
export const profileService = {
  getProfile: (userId) =>
    api.get(`/profile/${userId}`),
  
  updateProfile: (userId, updates) =>
    api.put(`/profile/${userId}`, updates),
  
  uploadCV: (userId, file) => {
    const formData = new FormData();
    formData.append('cv', file);

    // Let axios/browser set multipart boundary headers
    return api.post(`/profile/${userId}/upload-cv`, formData);
  }
};

// Jobs services
export const jobsService = {
  getAllJobs: (filters = {}) =>
    api.get('/jobs', { params: filters }),
  
  getJobById: (jobId) =>
    api.get(`/jobs/${jobId}`),
  
  postJob: (jobData) =>
    api.post('/jobs', jobData),
  
  getFilterOptions: () =>
    api.get('/jobs-filters')
};

// Skills service
export const skillsService = {
  getSkills: () =>
    api.get('/skills')
};

export default api;
