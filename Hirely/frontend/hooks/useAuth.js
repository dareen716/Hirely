// Auth Hook - Manages authentication state
'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    const storedUser = localStorage.getItem('user');
    
    if (storedSessionId && storedUser) {
      setSessionId(storedSessionId);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (email, password, name, role) => {
    try {
      const response = await authService.register(email, password, name, role);
      const { userId, sessionId: newSessionId, role: userRole } = response.data;
      
      const userData = { userId, name, role: userRole, email };
      setUser(userData);
      setSessionId(newSessionId);
      
      localStorage.setItem('sessionId', newSessionId);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { userId, sessionId: newSessionId, role: userRole, name: userName } = response.data;
      
      const userData = { userId, name: userName, role: userRole, email };
      setUser(userData);
      setSessionId(newSessionId);
      
      localStorage.setItem('sessionId', newSessionId);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    if (sessionId) {
      authService.logout(sessionId).catch(() => {});
    }
    setUser(null);
    setSessionId(null);
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
  };

  return {
    user,
    sessionId,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };
};
