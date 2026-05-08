import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate sending reset email
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600">TravelBooking</h1>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {isSent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and click the link to reset your password.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSent(false)} 
                  className="text-blue-600 hover:text-blue-700"
                >
                  try again
                </button>
              </p>
              <Link href="/login" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔑</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">
                  No worries! Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-6">
                Remember your password?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Help Text */}
        {!isSent && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Need help?{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                Contact Support
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
