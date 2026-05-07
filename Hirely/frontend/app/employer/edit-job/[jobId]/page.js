'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { jobsService } from '@/services/api';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

    fetchJob();
  }, [authLoading, isAuthenticated, router, user]);

  const fetchJob = async () => {
    try {
      setError('');
      const response = await jobsService.getJobById(params.jobId);
      const job = response.data;

      if (job.employerId !== user.userId) {
        setError('You can only edit your own jobs.');
        setLoading(false);
        return;
      }

      setFormData({
        title: job.title || '',
        type: job.type || 'internship',
        field: job.field || 'Technology',
        location: job.location || 'Cairo',
        description: job.description || '',
        requirements: (job.requirements || []).join(', '),
        salary: job.salary && job.salary !== 'Negotiable' ? job.salary : ''
      });
    } catch (err) {
      console.error('Failed to load job details:', err);
      setError('Failed to load job details.');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setSubmitting(true);
    try {
      const requirements = formData.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);

      await jobsService.updateJob(params.jobId, {
        employerId: user.userId,
        title: formData.title,
        type: formData.type,
        field: formData.field,
        location: formData.location,
        description: formData.description,
        requirements,
        salary: formData.salary || 'Negotiable'
      });

      router.push('/employer/dashboard');
    } catch (err) {
      console.error('Failed to update job:', err);
      setError('Failed to update job. Please try again.');
    }
    setSubmitting(false);
  };

  if (loading || authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
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
            <Link href="/employer/profile" className="text-gray-700 hover:text-blue-600 font-medium">
              Company Profile
            </Link>
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Edit Job Posting</h1>
        <p className="text-gray-600 mb-8">Update your job details and save changes</p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
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
            {submitting ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </main>
  );
}
