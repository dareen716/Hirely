'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/services/api';

export default function EmployerProfilePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'employer') {
      router.push('/');
      return;
    }

    fetchProfile();
  }, [authLoading, user, isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      const response = await profileService.getProfile(user.userId);
      setProfile(response.data);
      
      setFormData({
        companyName: response.data.profile.companyName || '',
        description: response.data.profile.description || '',
        location: response.data.profile.location || ''
      });
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return;
    }

    setSaving(true);
    try {
      await profileService.updateProfile(user.userId, {
        companyName: formData.companyName,
        description: formData.description,
        location: formData.location
      });
      setMessage('Company profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
    setSaving(false);
  };

  if (loading || authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Hirely</div>
          <div className="space-x-4">
            <Link href="/employer/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/employer/post-job" className="text-gray-700 hover:text-blue-600 font-medium">
              Post Job
            </Link>
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Company Profile</h1>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your Company Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Cairo, Egypt"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Company Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your company, mission, and culture..."
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">This will be visible to job seekers</p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">Next Steps:</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Complete your company profile</li>
            <li>
              ➔ <Link href="/employer/post-job" className="font-semibold hover:underline">Post your first job</Link>
            </li>
            <li>✓ Review applications (coming soon)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
