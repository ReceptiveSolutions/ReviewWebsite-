import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    googleAuth: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.googleAuth) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/');
    }
  };

  const handleGoogleSignup = () => {
    setFormData(prev => ({
      ...prev,
      googleAuth: true,
      password: '',
      confirmPassword: ''
    }));
    console.log('Google signup initiated');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
      <div className="absolute -right-20 bottom-1/4 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
      <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-amber-200 opacity-20 rotate-45"></div>
      <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-amber-200 opacity-20 rotate-12"></div>
      <div className="absolute left-1/3 top-20 w-24 h-24 bg-amber-300 opacity-15 -rotate-12"></div>
      <div className="absolute right-1/3 bottom-20 w-20 h-20 bg-amber-300 opacity-15 rotate-45"></div>
      <div className="absolute left-10 bottom-10 w-16 h-16 bg-amber-400 opacity-10 -rotate-45"></div>
      <div className="absolute right-10 top-10 w-16 h-16 bg-amber-400 opacity-10 rotate-12"></div>
      
      {/* Triangle elements */}
      <div className="absolute left-0 top-1/4 w-0 h-0 border-l-[100px] border-l-transparent border-b-[200px] border-b-amber-100 opacity-20"></div>
      <div className="absolute right-0 bottom-1/4 w-0 h-0 border-r-[150px] border-r-transparent border-t-[300px] border-t-amber-100 opacity-20"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-amber-200 relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-amber-900">Create your account</h2>
          <p className="mt-2 text-sm text-amber-800">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-brown-600 hover:text-brown-500">
              Sign in
            </a>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-brown-700">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-brown-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown-700">
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
                className={`mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {!formData.googleAuth && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-brown-700">
                    Password *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required={!formData.googleAuth}
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-brown-700">
                    Confirm Password *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required={!formData.googleAuth}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-brown-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </>
            )}
            
            <div className="flex items-center">
              <input
                id="googleAuth"
                name="googleAuth"
                type="checkbox"
                checked={formData.googleAuth}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-brown-300 rounded"
              />
              <label htmlFor="googleAuth" className="ml-2 block text-sm text-brown-700">
                Sign up with Google instead
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Sign up
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brown-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-brown-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-brown-300 rounded-md shadow-sm bg-white text-sm font-medium text-brown-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;