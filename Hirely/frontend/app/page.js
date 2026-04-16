'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'student') {
        router.push('/student/dashboard');
      } else if (user?.role === 'employer') {
        router.push('/employer/dashboard');
      }
    }
    setIsLoading(false);
  }, [isAuthenticated, user, router]);

  if (isLoading) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-blue-600">Hirely</div>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-2xl">
          Launch Your Career in Egypt
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Connect with top internships and entry-level opportunities at leading companies
        </p>
        
        <div className="flex gap-4 mb-12">
          <Link href="/register?role=student" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
            I&apos;m a Student
          </Link>
          <Link href="/register?role=employer" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50">
            I&apos;m Hiring
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">Find internships and entry-level jobs tailored to your skills and interests</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2">For Employers</h3>
            <p className="text-gray-600">Post opportunities and discover talented fresh graduates</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
            <p className="text-gray-600">Simple registration, quick job matching, and seamless communication</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 Hirely. Connecting talents with opportunities in Egypt.</p>
        </div>
      </footer>
    </main>
  );
}
