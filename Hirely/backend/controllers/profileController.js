// Profile Controller
// Handles student and employer profile operations
import { getUsers, saveUsers } from '../utils/dataStore.js';

export const getProfile = (req, res) => {
  const { userId } = req.params;
  const users = getUsers();

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile
  });
};

export const updateProfile = (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  const users = getUsers();

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update profile fields
  if (updates.education !== undefined) user.profile.education = updates.education;
  if (updates.skills !== undefined) user.profile.skills = updates.skills;
  if (updates.projects !== undefined) user.profile.projects = updates.projects;
  if (updates.location !== undefined) user.profile.location = updates.location;
  if (updates.companyName !== undefined) user.profile.companyName = updates.companyName;
  if (updates.description !== undefined) user.profile.description = updates.description;
  saveUsers(users);

  res.json({
    success: true,
    profile: user.profile
  });
};

export const uploadCV = (req, res) => {
  const { userId } = req.params;
  const users = getUsers();

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.role !== 'student') {
    return res.status(400).json({ error: 'Only students can upload CV' });
  }

  // multer stores the file on disk and exposes it via req.file
  if (!req.file) {
    return res.status(400).json({ error: 'Only PDF files are allowed' });
  }

  user.profile.cvFilename = req.file.filename;
  user.profile.cvFilePath = req.file.path; // for debugging; not used by frontend yet
  saveUsers(users);

  res.json({
    success: true,
    filename: user.profile.cvFilename,
    message: 'CV uploaded successfully'
  });
};
