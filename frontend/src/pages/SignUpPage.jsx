import React, { useState, useEffect } from 'react';
import { Mail, User, Lock, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <main
      className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 p-6 sm:p-12"
      aria-label="Signup page"
    >
      {/* Form Section */}
      <section
        role="region"
        aria-labelledby="signup-heading"
        className="flex justify-center items-center"
      >
        <div
          className={`w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-xl bg-white/30 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700 backdrop-blur-md transition-transform transform
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
          style={{ animationDuration: '0.5s', animationFillMode: 'forwards' }}
        >
          {/* Header */}
          <header className="text-center mb-8 select-none">
            <div className="inline-flex items-center justify-center rounded-xl p-4 bg-white/30 dark:bg-white/10 group hover:bg-white/50 dark:hover:bg-white/20 transition animate-bounce-slow shadow-lg">
              <MessageSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]" />
            </div>
            <h1
              id="signup-heading"
              className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight animate-glow"
            >
              Create Account
            </h1>
            <p className="mt-1 text-sm text-gray-800 dark:text-gray-100 animate-fade-in">
              Get started with your free account
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 font-semibold text-gray-800 dark:text-gray-200"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Aryan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-semibold text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="aryan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-semibold text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-10 pr-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg w-full flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
              aria-busy={isSigningUp}
            >
              {isSigningUp && <Spinner />}
              {isSigningUp ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Redirect */}
          <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300 select-none">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>

      {/* Visual Section */}
      <AuthImagePattern
        loading={false}
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

      {/* Custom Fade Animation */}
      <style>
        {`
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .motion-safe\\:animate-fade-slide-in {
            animation-name: fadeSlideIn;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
          }
          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 15px rgba(255,255,255,0.7), 0 0 30px rgba(255,255,255,0.6);
            }
            50% {
              text-shadow: 0 0 30px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.8);
            }
          }
          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }
        `}
      </style>
    </main>
  );
};

export default SignUpPage;
