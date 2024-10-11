"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Login attempted with:', { email, password });
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const { token } = await res.json();
      // console.log("The received token is: ", token);

      // Store JWT in cookie
      if (token) {
        document.cookie = `jwt=${token}; path=/;`;
        // console.log("JWT cookie set:", document.cookie);
        // If you need HttpOnly for security reasons, you'll typically set it on the server side.
        // document.cookie = `jwt=${token}; path=/; secure; HttpOnly`;
      }

      // Redirect to protected page on success
      router.push('/explore');
    } catch (error) {
      console.log(error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="h-[100vh] flex">
      {/* Left Side (Image) */}
      <div className="w-2/3 bg-gray-100 flex items-center justify-center">
        <img
          src="https://via.placeholder.com/300" // Replace with actual image path
          alt="Platform Showcase"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/3 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="********"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
              >
                Login
              </button>
            </div>
            <div>{error && <p className="text-red-500 mt-2">{error}</p>}</div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don{'\''}t have an account?{' '}
              <Link href="/register" className="text-yellow-600 hover:text-yellow-500">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="text-yellow-600 hover:text-yellow-500 underline"
            >
              Return to previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
