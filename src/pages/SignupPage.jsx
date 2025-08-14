import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully! Redirecting to login...');
        console.log('Success:', data);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
        console.log('Error:', data);
      }
    } catch (err) {
      setError('Network error. Make sure your backend is running.');
      console.error('Network error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setMessage('');
    setError('');

    try {
      // Redirect to your backend's Google OAuth endpoint
      window.location.href = 'http://localhost:5000/api/auth/google';
    } catch (err) {
      setError('Failed to initiate Google signup.');
      console.error('Google signup error:', err);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-amber-200 opacity-40"></div>
      <div className="absolute -right-20 bottom-1/4 w-64 h-64 rounded-full bg-amber-200 opacity-40"></div>
      <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-amber-300 opacity-30 rotate-45"></div>
      <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-amber-300 opacity-30 rotate-12"></div>
      <div className="absolute left-1/3 top-20 w-24 h-24 bg-amber-400 opacity-25 -rotate-12"></div>
      <div className="absolute right-1/3 bottom-20 w-20 h-20 bg-amber-400 opacity-25 rotate-45"></div>
      
      {/* Triangle elements */}
      <div className="absolute left-0 top-1/4 w-0 h-0 border-l-[100px] border-l-transparent border-b-[200px] border-b-amber-300 opacity-30"></div>
      <div className="absolute right-0 bottom-1/4 w-0 h-0 border-r-[150px] border-r-transparent border-t-[300px] border-t-amber-300 opacity-30"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-amber-200 relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-amber-900">Create Account</h2>
          <p className="mt-2 text-sm text-amber-800">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-amber-600 hover:text-amber-500">
              Sign in
            </a>
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200">
            <div className="text-sm text-green-700">{message}</div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        
        {/* Google Signup Button */}
        <button 
          onClick={handleGoogleSignup}
          disabled={googleLoading || loading}
          className="w-full inline-flex justify-center py-3 px-4 border border-amber-300 rounded-md shadow-sm bg-white text-sm font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          {googleLoading ? 'Redirecting to Google...' : 'Sign up with Google'}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-amber-600">Or continue with email</span>
          </div>
        </div>
        
        {/* Regular Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-800">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={googleLoading}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={googleLoading}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={googleLoading}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={googleLoading}
              className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50"
              placeholder="Create a password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up with Email'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;