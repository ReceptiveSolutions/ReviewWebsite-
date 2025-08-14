import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check for Google auth success/error or manual login success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const googleAuth = urlParams.get('google');
    const errorParam = urlParams.get('error');

    if (token) {
      // Store token and redirect to home
      localStorage.setItem('token', token);
      setMessage(googleAuth ? 'Google login successful!' : 'Login successful!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else if (errorParam) {
      switch(errorParam) {
        case 'google_auth_failed':
          setError('Google authentication failed. Please try again.');
          break;
        case 'no_user_data':
          setError('No user data received from Google. Please try again.');
          break;
        case 'no_email':
          setError('No email found in Google profile. Please try again.');
          break;
        default:
          setError('Authentication failed. Please try again.');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setError('');
    setMessage('');
    
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:5000/api/auth/google';
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
          <h2 className="mt-6 text-3xl font-extrabold text-amber-900">Welcome back</h2>
          <p className="mt-2 text-sm text-amber-800">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-amber-600 hover:text-amber-500">
              Sign up
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
        
        {/* Google Login Button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            type="button"
            className="w-full inline-flex justify-center py-3 px-4 border border-amber-300 rounded-md shadow-sm bg-white text-sm font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            {googleLoading ? 'Redirecting to Google...' : 'Sign in with Google'}
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-amber-600">Or continue with email</span>
            </div>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800">
                Email address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading || googleLoading}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50 ${
                  errors.email ? 'border-red-500' : 'border-amber-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading || googleLoading}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border disabled:opacity-50 ${
                  errors.password ? 'border-red-500' : 'border-amber-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-amber-600 hover:text-amber-500">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;