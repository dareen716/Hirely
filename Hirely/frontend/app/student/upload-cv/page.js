'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/services/api';

export default function UploadCVPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [currentCV, setCurrentCV] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const fetchProfile = async () => {
    try {
      const response = await profileService.getProfile(user.userId);
      if (response.data.profile.cvFilename) {
        setCurrentCV(response.data.profile.cvFilename);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      setFileName(file.name);
      setFile(file);
      setError('');
    } else {
      setFileName('');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    try {
      const response = await profileService.uploadCV(user.userId, file);
      setMessage('CV uploaded successfully!');
      setCurrentCV(response.data.filename);
      setFileName('');
      setFile(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to upload CV');
    }
    setUploading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
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
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Upload CV</h1>

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

        <div className="bg-white rounded-lg shadow-md p-8">
          {currentCV && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Current CV:</strong> {currentCV}
              </p>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-4">Select PDF File</label>
              
              {/* File Input */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF files only (Max 10MB)</p>
                </label>
              </div>

              {fileName && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm"><strong>Selected:</strong> {fileName}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload CV'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Tips:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Use a clean, professional format</li>
              <li>✓ Include your skills and experience</li>
              <li>✓ Keep it to 1-2 pages</li>
              <li>✓ Use clear headings and bullet points</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
