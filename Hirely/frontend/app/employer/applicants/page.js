'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { jobsService } from '@/services/api';

const STATUS_STYLES = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function EmployerApplicantsPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJobId, setSelectedJobId] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [updatingApplicationId, setUpdatingApplicationId] = useState(null);

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

    fetchApplicantsData();
  }, [authLoading, isAuthenticated, router, user]);

  const fetchApplicantsData = async () => {
    try {
      setError('');
      const [jobsRes, applicantsRes] = await Promise.all([
        jobsService.getAllJobs(),
        jobsService.getApplicationsByEmployer(user.userId)      ]);

      const employerJobs = jobsRes.data.jobs.filter(job => job.employerId === user.userId);
      setJobs(employerJobs);

      const jobTitleMap = employerJobs.reduce((acc, job) => {
        acc[job.id] = job.title;
        return acc;
      }, {});

      const rawApplicants = applicantsRes.data.applications || applicantsRes.data || [];
      const normalizedApplicants = rawApplicants.map(application => ({
        ...application,
        jobTitle: application.jobTitle || jobTitleMap[application.jobId] || 'Unknown Job'
      }));

      setApplicants(normalizedApplicants);
    } catch (err) {
      console.error('Failed to fetch applicants:', err);
      setError('Failed to load applicants. Please try again.');
    }

    setLoading(false);
  };

  const filteredApplicants = useMemo(() => {
    if (selectedJobId === 'all') {
      return applicants;
    }
    return applicants.filter(applicant => applicant.jobId === selectedJobId);
  }, [applicants, selectedJobId]);

  const handleStatusUpdate = async (applicationId, nextStatus) => {
    const previousApplicants = applicants;
    setUpdatingApplicationId(applicationId);

    setApplicants(currentApplicants =>
      currentApplicants.map(applicant =>
        applicant.id === applicationId
          ? { ...applicant, status: nextStatus }
          : applicant
      )
    );

    try {
      await jobsService.updateApplicationStatus(applicationId, nextStatus);
    } catch (err) {
      console.error('Failed to update applicant status:', err);
      setApplicants(previousApplicants);
      setError('Could not update applicant status. Please try again.');
    } finally {
      setUpdatingApplicationId(null);
    }
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">View Applicants</h1>
            <p className="text-gray-600 mt-1">Review and manage applications across your jobs</p>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-sm font-semibold mb-2">Filter by job</label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredApplicants.length === 0 ? (
            <div className="text-center py-12 px-6">
              <p className="text-gray-600">No applicants found for the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Student</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Email</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Job</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">CV</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Applied Date</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Status</th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map(applicant => (
                    <tr key={applicant.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {applicant.studentName || applicant.student?.name || 'Unknown Student'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {applicant.studentEmail || applicant.student?.email || '-'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{applicant.jobTitle}</td>
                      <td className="px-4 py-4 text-sm">
                        {applicant.cv?.fileName ? (
                          <a
                            href={`http://localhost:5001/uploads/cv/${applicant.cv.fileName}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                          >
                            Download CV
                          </a>
                        ) : (
                          <span className="text-gray-500">Not available</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[applicant.status] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {applicant.status || 'applied'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(applicant.id, 'shortlisted')}
                            disabled={updatingApplicationId === applicant.id}
                            className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:opacity-50"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(applicant.id, 'rejected')}
                            disabled={updatingApplicationId === applicant.id}
                            className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
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
