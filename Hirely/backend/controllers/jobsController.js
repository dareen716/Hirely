// Jobs Controller
// Handles job listing and posting
import { v4 as uuidv4 } from 'uuid';
import { getJobs, saveJobs, getUsers } from '../utils/dataStore.js';

export const getAllJobs = (req, res) => {
  const { type, location, field } = req.query;
  const jobs = getJobs();

  let filtered = jobs;

  // Apply filters
  if (type) {
    filtered = filtered.filter(j => j.type === type);
  }
  if (location) {
    filtered = filtered.filter(j => j.location === location);
  }
  if (field) {
    filtered = filtered.filter(j => j.field === field);
  }

  // Sort by most recent
  filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ jobs: filtered });
};

export const getJobById = (req, res) => {
  const { jobId } = req.params;
  const jobs = getJobs();
  const users = getUsers();

  const job = jobs.find(j => j.id === jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Include employer info
  const employer = users.find(u => u.id === job.employerId);
  const jobWithEmployer = {
    ...job,
    employer: employer ? {
      id: employer.id,
      name: employer.profile.companyName || employer.name,
      description: employer.profile.description
    } : null
  };

  res.json(jobWithEmployer);
};

export const postJob = (req, res) => {
  const { employerId, title, type, field, location, description, requirements, salary } = req.body;
  const jobs = getJobs();
  const users = getUsers();

  // Validation
  if (!employerId || !title || !type || !field || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify employer exists and is actually an employer
  const employer = users.find(u => u.id === employerId);
  if (!employer || employer.role !== 'employer') {
    return res.status(403).json({ error: 'Only employers can post jobs' });
  }

  // Create new job
  const newJob = {
    id: `job-${uuidv4()}`,
    employerId,
    title,
    type, // internship or entry-level
    field,
    location,
    description,
    requirements: requirements || [],
    salary: salary || 'Negotiable',
    createdAt: new Date()
  };

  jobs.push(newJob);
  saveJobs(jobs);

  res.status(201).json({
    success: true,
    jobId: newJob.id,
    job: newJob
  });
};

export const getFilterOptions = (req, res) => {
  const jobs = getJobs();
  // Return available filter options
  const types = [...new Set(jobs.map(j => j.type))];
  const locations = [...new Set(jobs.map(j => j.location))];
  const fields = [...new Set(jobs.map(j => j.field))];

  res.json({
    types,
    locations,
    fields
  });
};
