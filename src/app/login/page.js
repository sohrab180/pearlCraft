'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await fetch('https://api.mypearlcraft.com/api/v20/ecom/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Login API response:', data); // 👈 Logs full response

    if (response.ok) {
      // Store the entire response
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('authData', JSON.stringify(data));

      // Redirect to /collection after successful login
      window.location.href = '/dashboard';
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err); // 👈 Logs any error
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url(/signupbg.jpg)" }}></div>

      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-pink-200">
        <div className="text-center mb-6">
          <img src="/sealogo.png" alt="Pearl Craft" className="mx-auto w-16 mb-2" />
          <h1 className="text-3xl font-bold text-pink-700">Welcome Back</h1>
          <p className="text-sm text-gray-600">Login to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-pink-600"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-pink-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-pink-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
