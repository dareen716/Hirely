// Authentication Controller - Mock implementation
// TODO: Replace with real authentication (JWT, bcrypt, database)
import { v4 as uuidv4 } from 'uuid';
import { getUsers, saveUsers, getSessions, saveSessions } from '../utils/dataStore.js';

export const register = (req, res) => {
  const { email, password, name, role } = req.body;
  const users = getUsers();

  // Validation
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Create new user (Mock - no password hashing)
  const newUser = {
    id: `user-${uuidv4()}`,
    email,
    password, // Mock only - never store plain passwords
    name,
    role,
    profile: role === 'student' 
      ? {
          education: '',
          skills: [],
          projects: [],
          cvFilename: null,
          location: ''
        }
      : {
          companyName: name,
          description: '',
          location: ''
        }
  };

  users.push(newUser);
  saveUsers(users);

  // Create session
  const sessionId = uuidv4();
  const sessions = getSessions();
  sessions[sessionId] = newUser.id;
  saveSessions(sessions);

  res.status(201).json({
    success: true,
    userId: newUser.id,
    sessionId,
    role
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Find user (Mock - plain password comparison)
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Create session
  const sessionId = uuidv4();
  const sessions = getSessions();
  sessions[sessionId] = user.id;
  saveSessions(sessions);

  res.json({
    success: true,
    userId: user.id,
    sessionId,
    role: user.role,
    name: user.name
  });
};

export const logout = (req, res) => {
  const { sessionId } = req.body;
  const sessions = getSessions();
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId];
    saveSessions(sessions);
  }
  res.json({ success: true });
};

export const resetPassword = (req, res) => {
  const { email } = req.body;

  // Mock implementation - just acknowledge
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  // In real app: send email with reset link
  res.json({
    success: true,
    message: 'Password reset link sent to email (mocked)'
  });
};

export const verifySession = (req, res) => {
  const { sessionId } = req.query;
  const sessions = getSessions();
  const users = getUsers();

  if (!sessionId || !sessions[sessionId]) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const userId = sessions[sessionId];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  res.json({
    valid: true,
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email
  });
};
