import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toaster from '../Toaster'; // Adjust path based on your project structure

function AddBusinessPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    password: '',
    aadhar_num: '',
    pan_num: '',
  });

  const [aadhar_img, setAadharImg] = useState(null);
  const [pan_img, setPanImg] = useState(null);
  const [prof_img, setProfImg] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      setShowLogin(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue.');
        return;
      }
      if (userData?.email) {
        setLoginData((prev) => ({ ...prev, email: userData.email }));
      }
    }
  }, [id, userData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'aadhar_img') setAadharImg(files[0]);
    if (name === 'pan_img') setPanImg(files[0]);
    if (name === 'prof_img') setProfImg(files[0]);
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      setError('First name is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadhar_num)) {
      setError('Aadhar number must be 12 digits');
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_num)) {
      setError('Invalid PAN number format');
      return false;
    }
    if (!id && (!formData.password || formData.password.length < 6)) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!aadhar_img && !id) {
      setError('Aadhar image is required');
      return false;
    }
    if (!pan_img && !id) {
      setError('PAN image is required');
      return false;
    }
    if (!prof_img && !id) {
      setError('Profile image is required');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', id);
        console.log('User ID:', id);

        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        if (userResponse.ok) {
          const userDataResponse = await userResponse.json();
          const user = userDataResponse.user;
          console.log('User Data:', user);
          setFormData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            address: user.address || '',
            password: '',
            aadhar_num: user.aadhar_num || '',
            pan_num: user.pan_num || '',
          });
          setShowLogin(false);
          setMessage('Authenticated successfully! Please update your business details.');
        } else {
          const errorData = await userResponse.json();
          console.error('User fetch error:', errorData);
          setError(errorData.error || `Failed to fetch user details (Status: ${userResponse.status})`);
        }
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Make sure your backend is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('first_name', formData.first_name);
      fd.append('last_name', formData.last_name);
      fd.append('email', formData.email);
      fd.append('address', formData.address);
      fd.append('password', formData.password);
      fd.append('aadhar_num', formData.aadhar_num);
      fd.append('pan_num', formData.pan_num);

      if (aadhar_img) fd.append('aadhar_img', aadhar_img);
      if (pan_img) fd.append('pan_img', pan_img);
      if (prof_img) fd.append('prof_img', prof_img);

      let url = 'http://localhost:5000/api/business/signup-business';
      let method = 'POST';
      let headers = {};

      if (id) {
        url = `http://localhost:5000/api/auth/users/${id}`;
        method = 'PUT';
        headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      }

      const response = await fetch(url, {
        method,
        headers,
        body: fd,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          id
            ? 'Business details updated successfully!'
            : 'Business account created successfully! Redirecting to login...'
        );
        console.log('Success:', data);

        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          address: '',
          password: '',
          aadhar_num: '',
          pan_num: '',
        });
        setAadharImg(null);
        setPanImg(null);
        setProfImg(null);

        if (!id) {
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } else {
        // Handle specific Prisma error for unique constraint violation
        if (data.code === 'P2002' && data.meta?.target?.includes('aadhar_num')) {
          setError('This Aadhar number is already registered.');
        } else if (data.code === 'P2002' && data.meta?.target?.includes('pan_num')) {
          setError('This PAN number is already registered.');
        } else if (data.code === 'P2002' && data.meta?.target?.includes('email')) {
          setError('This email is already registered.');
        } else {
          setError(data.error || 'Something went wrong');
        }
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
      window.location.href = 'http://localhost:5000/api/auth/google';
    } catch (err) {
      setError('Failed to initiate Google signup.');
      console.error('Google signup error:', err);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-amber-200 relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-amber-900">
            {id ? 'Update Business Details' : 'Business Signup'}
          </h2>
          <p className="mt-2 text-sm text-amber-800">
            {id ? 'Update your business information' : 'Already have an account?'}{' '}
            {!id && (
              <a href="/login" className="font-medium text-amber-600 hover:text-amber-500">
                Sign in
              </a>
            )}
          </p>
        </div>

        {/* Toaster for Success and Error Messages */}
        <Toaster
          message={message || error}
          type={message ? 'success' : 'error'}
          duration={5000}
          onClose={() => {
            setMessage('');
            setError('');
          }}
        />

        {showLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 bg-amber-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-amber-900 text-center">Please Re-Authenticate</h3>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              placeholder="Email"
              className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              placeholder="Password"
              className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>
        ) : (
          <>
            {!id && (
              <button
                onClick={handleGoogleSignup}
                disabled={googleLoading || loading}
                className="w-full inline-flex justify-center py-3 px-4 border border-amber-300 rounded-md shadow-sm bg-white text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50"
              >
                {googleLoading ? 'Redirecting to Google...' : 'Sign up with Google'}
              </button>
            )}

            {!id && (
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-amber-600">Or continue with email</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {!id && (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              )}
              <input
                type="text"
                name="aadhar_num"
                value={formData.aadhar_num}
                onChange={handleChange}
                required
                placeholder="Aadhar Number"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="file"
                name="aadhar_img"
                onChange={handleFileChange}
                accept="image/*"
                required={!id}
                className="w-full p-2 border border-amber-300 rounded"
              />
              <input
                type="text"
                name="pan_num"
                value={formData.pan_num}
                onChange={handleChange}
                required
                placeholder="PAN Number"
                className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="file"
                name="pan_img"
                onChange={handleFileChange}
                accept="image/*"
                required={!id}
                className="w-full p-2 border border-amber-300 rounded"
              />
              <input
                type="file"
                name="prof_img"
                onChange={handleFileChange}
                accept="image/*"
                required={!id}
                className="w-full p-2 border border-amber-300 rounded"
              />
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3 px-4 rounded-md bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
              >
                {loading ? (id ? 'Updating Business...' : 'Creating Business Account...') : id ? 'Update Business' : 'Sign Up'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AddBusinessPage;