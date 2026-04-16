'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { jobsService } from '@/services/api';

export default function PostJobPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    type: 'internship',
    field: 'Technology',
    location: 'Cairo',
    description: '',
    requirements: '',
    salary: ''
  });

  const jobTypes = ['internship', 'entry-level'];
  const jobFields = ['Technology', 'Marketing', 'Business', 'Design', 'Finance', 'Sales'];
  const locations = ['Cairo', 'Giza', 'New Cairo', 'Alexandria', 'Hurghada', 'Remote'];

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

    setLoading(false);
  }, [authLoading, user, isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setSubmitting(true);

    try {
      // Parse requirements from comma-separated string
      const requirements = formData.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      const response = await jobsService.postJob({
        employerId: user.userId,
        title: formData.title,
        type: formData.type,
        field: formData.field,
        location: formData.location,
        description: formData.description,
        requirements,
        salary: formData.salary || 'Negotiable'
      });

      setMessage('Job posted successfully! Redirecting...');
      
      setTimeout(() => {
        router.push('/employer/dashboard');
      }, 1500);
    } catch (err) {
      setError('Failed to post job. Please try again.');
      console.error(err);
    }
    setSubmitting(false);
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
            <Link href="/employer/profile" className="text-gray-700 hover:text-blue-600 font-medium">
              Company Profile
            </Link>
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
        <p className="text-gray-600 mb-8">Share your opportunity with talented students and fresh graduates</p>

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

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Junior Frontend Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Job Type and Field */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Job Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Field *</label>
              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {jobFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location and Salary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Location *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Salary Range (Optional)</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 2000-3000 EGP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold mb-2">Required Skills (Optional)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List skills separated by commas, e.g., React, JavaScript, CSS"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple skills with commas</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">Tips for a Great Job Posting:</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Be clear about the role and responsibilities</li>
            <li>• List specific skills and qualifications needed</li>
            <li>• Include information about your company culture</li>
            <li>• Specify the salary range if possible</li>
            <li>• Mention any benefits or learning opportunities</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
