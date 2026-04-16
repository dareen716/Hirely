'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { jobsService } from '@/services/api';

export default function JobListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    field: searchParams.get('field') || ''
  });
  const [filterOptions, setFilterOptions] = useState({
    types: [],
    locations: [],
    fields: []
  });
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

    fetchData();
  }, [authLoading, user, isAuthenticated, router]);

  useEffect(() => {
    if (filterOptions.types.length > 0) {
      fetchJobs();
    }
  }, [filters]);

  const fetchData = async () => {
    try {
      const [jobsRes, filtersRes] = await Promise.all([
        jobsService.getAllJobs(filters),
        jobsService.getFilterOptions()
      ]);
      
      setJobs(jobsRes.data.jobs);
      setFilterOptions(filtersRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const fetchJobs = async () => {
    try {
      const response = await jobsService.getAllJobs(filters);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    if (newFilters.type) params.append('type', newFilters.type);
    if (newFilters.location) params.append('location', newFilters.location);
    if (newFilters.field) params.append('field', newFilters.field);
    
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({ type: '', location: '', field: '' });
    router.push('');
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
            <Link href="/student/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Opportunities</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-bold mb-6">Filters</h2>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {filterOptions.types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Locations</option>
                  {filterOptions.locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Field Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Field</label>
                <select
                  value={filters.field}
                  onChange={(e) => handleFilterChange('field', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Fields</option>
                  {filterOptions.fields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              {(filters.type || filters.location || filters.field) && (
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {job.employer?.name || 'Company'}
                        </p>
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

                    <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map(req => (
                        <span key={req} className="inline-block bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs">
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="inline-block text-gray-600 text-xs">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">📍 {job.location}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{job.salary}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled" title="Applications coming in Sprint 2">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No jobs found matching your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
