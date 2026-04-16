import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

const usersFile = path.join(dataDir, 'users.json');
const jobsFile = path.join(dataDir, 'jobs.json');
const sessionsFile = path.join(dataDir, 'sessions.json');
const skillsFile = path.join(dataDir, 'skills.json');

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readJson = (filePath, fallback) => {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    writeJson(filePath, fallback);
    return fallback;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.trim()) {
    return fallback;
  }

  return JSON.parse(content);
};

const writeJson = (filePath, data) => {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export const getUsers = () => readJson(usersFile, []);
export const saveUsers = (users) => writeJson(usersFile, users);

export const getJobs = () => readJson(jobsFile, []);
export const saveJobs = (jobs) => writeJson(jobsFile, jobs);

export const getSessions = () => readJson(sessionsFile, {});
export const saveSessions = (sessions) => writeJson(sessionsFile, sessions);

export const getSkills = () => readJson(skillsFile, []);
