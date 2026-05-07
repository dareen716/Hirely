'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { jobsService } from '@/services/api';

const STATUS_STYLES = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function StudentApplicationsPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);

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

    fetchApplications();
  }, [authLoading, isAuthenticated, router, user]);

  const fetchApplications = async () => {
    try {
      setError('');
      const applicationsRes = await jobsService.getApplicationsByStudent(user.userId);
      const rawApplications = applicationsRes.data.applications || [];

      const uniqueJobIds = [...new Set(rawApplications.map(application => application.jobId).filter(Boolean))];
      const jobDetailsEntries = await Promise.all(
        uniqueJobIds.map(async (jobId) => {
          try {
            const jobRes = await jobsService.getJobById(jobId);
            return [jobId, jobRes.data];
          } catch (err) {
            return [jobId, null];
          }
        })
      );

      const jobDetailsById = Object.fromEntries(jobDetailsEntries);

      const normalizedApplications = rawApplications.map(application => {
        const job = jobDetailsById[application.jobId];
        return {
          ...application,
          jobTitle: job?.title || 'Unknown Job',
          employerName: job?.employer?.name || 'Unknown Employer'
        };
      });

      setApplications(normalizedApplications);
    } catch (err) {
      console.error('Failed to fetch student applications:', err);
      setError('Failed to load your applications. Please try again.');
    }

    setLoading(false);
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
            <Link href="/student/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/student/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Jobs
            </Link>
            <Link href="/student/profile" className="text-gray-700 hover:text-blue-600 font-medium">
              Profile
            </Link>
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Track Applications</h1>
          <p className="text-gray-600 mt-1">View the status of jobs you have applied to</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {applications.length === 0 ? (
            <div className="text-center py-12 px-6">
              <p className="text-gray-700 font-medium">You have not applied to any jobs yet.</p>
              <p className="text-gray-500 mt-2">Start exploring opportunities and submit your first application.</p>
              <Link href="/student/jobs" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Job Title</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Employer</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Applied Date</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(application => (
                    <tr key={application.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{application.jobTitle}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{application.employerName}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[application.status] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {application.status || 'applied'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
