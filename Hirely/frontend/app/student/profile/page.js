'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { profileService, skillsService } from '@/services/api';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    projects: [],
    location: '',
    newProjectTitle: '',
    newProjectDesc: ''
  });

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

  const fetchData = async () => {
    try {
      const [profileRes, skillsRes] = await Promise.all([
        profileService.getProfile(user.userId),
        skillsService.getSkills()
      ]);
      
      const profileData = profileRes.data;
      setProfile(profileData);
      setAvailableSkills(skillsRes.data.skills);
      
      setFormData({
        education: profileData.profile.education || '',
        skills: profileData.profile.skills || [],
        projects: profileData.profile.projects || [],
        location: profileData.profile.location || '',
        newProjectTitle: '',
        newProjectDesc: ''
      });
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const addProject = () => {
    if (formData.newProjectTitle.trim()) {
      setFormData(prev => ({
        ...prev,
        projects: [
          ...prev.projects,
          { title: prev.newProjectTitle, description: prev.newProjectDesc }
        ],
        newProjectTitle: '',
        newProjectDesc: ''
      }));
    }
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      await profileService.updateProfile(user.userId, {
        education: formData.education,
        skills: formData.skills,
        projects: formData.projects,
        location: formData.location
      });
      setMessage('Profile updated successfully!');
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

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
          {/* Education */}
          <div>
            <label className="block text-sm font-semibold mb-2">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g., Cairo University - Computer Science"
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
              placeholder="e.g., Cairo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold mb-3">Skills</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableSkills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    formData.skills.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-semibold mb-3">Projects</label>
            
            {/* Add Project Form */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={formData.newProjectTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, newProjectTitle: e.target.value }))}
                placeholder="Project title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={formData.newProjectDesc}
                onChange={(e) => setFormData(prev => ({ ...prev, newProjectDesc: e.target.value }))}
                placeholder="Project description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Add Project
              </button>
            </div>

            {/* Projects List */}
            {formData.projects.length > 0 && (
              <div className="space-y-2">
                {formData.projects.map((project, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </main>
  );
}
