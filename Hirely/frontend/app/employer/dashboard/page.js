'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService, jobsService } from '@/services/api';

export default function EmployerDashboard() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

    fetchData();
  }, [authLoading, user, isAuthenticated, router]);

  const fetchData = async () => {
    try {
      const [profileRes, jobsRes] = await Promise.all([
        profileService.getProfile(user.userId),
        jobsService.getAllJobs()
      ]);
      
      setProfile(profileRes.data);
      // Filter jobs posted by this employer
      const employerJobs = jobsRes.data.jobs.filter(j => j.employerId === user.userId);
      setJobs(employerJobs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
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
            <Link href="/employer/post-job" className="text-gray-700 hover:text-blue-600 font-medium">
              Post Job
            </Link>
            <Link href="/employer/profile" className="text-gray-700 hover:text-blue-600 font-medium">
              Company Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Manage your job postings and company profile</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-blue-600">{jobs.length}</div>
            <p className="text-gray-600 mt-2">Active Job Postings</p>
          </div>
          <Link href="/employer/post-job" className="bg-blue-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">➕</div>
              <p className="font-semibold">Post a New Job</p>
            </div>
          </Link>
        </div>

        {/* Company Info */}
        {profile && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Company Name</h3>
                <p className="text-gray-900">{profile.profile.companyName || profile.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Location</h3>
                <p className="text-gray-900">{profile.profile.location || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Description</h3>
                <p className="text-gray-900">{profile.profile.description || 'No description added'}</p>
              </div>
            </div>
            <Link href="/employer/profile" className="mt-6 text-blue-600 hover:text-blue-700 font-semibold">
              Edit Company Profile →
            </Link>
          </div>
        )}

        {/* Job Listings */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Your Job Postings</h2>
          
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2">
                        {job.type}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {job.field}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    <span className="ml-4">{job.salary}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No job postings yet</p>
              <Link href="/employer/post-job" className="text-blue-600 hover:text-blue-700 font-semibold">
                Create your first job posting →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
