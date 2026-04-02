'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication
    if (username === 'admin' && password === 'password123') {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try admin / password123');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 fill-indigo-500 text-indigo-500" />
              <h1 className="text-2xl font-bold text-slate-900">Client Onboarding Portal</h1>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Login</h2>
          <p className="text-center text-slate-600 mb-6">
            Enter your credentials to access the portal
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <Input
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 float-right mt-1">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-6"
              disabled={!username || !password || isLoading}
            >
              LOGIN
            </Button>

            {/* Secure Access Label */}
            <p className="text-center text-xs text-slate-500 font-medium">🔒 SECURE ACCESS</p>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600 leading-relaxed">
              By logging in, you agree to our terms of service and data privacy guidelines for
              client data handling.
            </p>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 pt-6 border-t border-slate-200 flex justify-center gap-4 text-xs">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Privacy Policy
            </a>
            <span className="text-slate-300">|</span>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Terms of Service
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
