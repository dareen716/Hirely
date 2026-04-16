'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/services/api';

export default function StudentDashboard() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role !== 'student') {
      router.push('/');
      return;
    }

    fetchProfile();
  }, [authLoading, user, isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      if (user?.userId) {
        const response = await profileService.getProfile(user.userId);
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
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
            <Link href="/student/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Jobs
            </Link>
            <Link href="/student/profile" className="text-gray-700 hover:text-blue-600 font-medium">
              Profile
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
          <p className="text-gray-600">Start exploring internship and entry-level opportunities</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/student/jobs" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Browse Opportunities</h3>
            <p className="text-gray-600 text-sm">Find internships and entry-level jobs</p>
          </Link>

          <Link href="/student/profile" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
            <p className="text-gray-600 text-sm">Add education, skills, and projects</p>
          </Link>

          <Link href="/student/upload-cv" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Upload CV</h3>
            <p className="text-gray-600 text-sm">{profile?.profile?.cvFilename ? 'Update your CV' : 'Add your CV'}</p>
          </Link>
        </div>

        {/* Profile Summary */}
        {profile && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Education</h3>
                <p className="text-gray-900">{profile.profile.education || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Location</h3>
                <p className="text-gray-900">{profile.profile.location || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">CV</h3>
                <p className="text-gray-900">{profile.profile.cvFilename || 'Not uploaded'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.profile.skills && profile.profile.skills.length > 0 ? (
                    profile.profile.skills.map(skill => (
                      <span key={skill} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600">No skills added</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
