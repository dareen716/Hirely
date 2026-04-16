'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password required');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      const role = result.data.role;
      router.push(role === 'student' ? '/student/dashboard' : '/employer/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleDemoLogin = async (email, password) => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const role = result.data.role;
      router.push(role === 'student' ? '/student/dashboard' : '/employer/dashboard');
    } else {
      setError('Demo login failed');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-blue-600 font-bold text-2xl mb-8 block">
          Hirely
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <button
              type="button"
              onClick={() => handleDemoLogin('ahmed@example.com', 'password123')}
              disabled={loading}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium disabled:opacity-50"
            >
              Demo: Student (Ahmed)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('startup@example.com', 'password123')}
              disabled={loading}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium disabled:opacity-50"
            >
              Demo: Employer
            </button>
          </div>

          <div className="flex justify-between text-sm">
            <Link href="/reset-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
