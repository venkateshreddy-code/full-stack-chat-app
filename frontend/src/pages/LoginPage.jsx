import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 p-6 sm:p-12">
      {/* Form Section */}
      <section className="flex justify-center items-center">
        <div
          className={`w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-xl bg-white/30 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700 backdrop-blur-md transition-transform transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } duration-700 ease-out motion-safe:animate-fade-slide-in`}
        >
          {/* Header */}
          <header className="text-center mb-8 select-none">
            <div className="inline-flex items-center justify-center rounded-xl p-4 bg-white/30 dark:bg-white/10 group hover:bg-white/50 dark:hover:bg-white/20 transition animate-bounce-slow shadow-lg">
              <MessageSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight animate-glow">
              Login to ChatHari
            </h2>
            <p className="mt-1 text-sm text-gray-800 dark:text-gray-100 animate-fade-in">
              Welcome back! Please sign in to continue
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                  placeholder="aryan@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-10 pr-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg w-full flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
              aria-busy={isLoggingIn}
            >
              {isLoggingIn && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  role="status"
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
              )}
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300 select-none">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            >
              Create Account
            </Link>
          </p>
        </div>
      </section>

      {/* Right Section Visual */}
      <div className="hidden lg:flex relative flex-col justify-center items-center text-white px-14 select-none overflow-hidden">
        {/* Animated Floating Bubbles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/10 opacity-40"
              style={{
                width: `${12 + Math.random() * 28}px`,
                height: `${12 + Math.random() * 28}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float${(i % 5) + 1} ${6 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-xl space-y-6">
          {/* Glowing, drifting, floating Chat Icon */}
          <div className="inline-flex items-center justify-center rounded-full bg-white/20 p-6 shadow-xl animate-float-rotate hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.9)] transition-transform duration-700">
            <MessageSquare className="h-14 w-14 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.85)]" />
          </div>

          {/* Typed Animated Headline */}
        <h2 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] overflow-hidden whitespace-nowrap border-r-4 border-white pr-4 typing mx-auto max-w-full">
  Welcome back to ChatHari!
</h2>



          {/* Animated Paragraph */}
          <p className="mt-2 text-xl text-white/90 animate-fade-bounce max-w-lg mx-auto px-2">
            Jump into conversations and reconnect with your favorite people.
          </p>

          {/* Animated SVG Chat Illustration */}
          <div
            className="mt-12 w-72 h-72 relative mx-auto cursor-pointer transform transition-transform duration-700 hover:scale-110 hover:-rotate-3"
            aria-hidden="true"
          >
            <svg
              className="w-full h-full animate-chat-pop"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Chat bubbles illustration"
            >
              <defs>
                <linearGradient id="bubbleGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="40" fill="url(#bubbleGradient)" />
              <circle cx="130" cy="50" r="30" fill="url(#bubbleGradient)" opacity="0.7" />
              <circle cx="100" cy="120" r="35" fill="url(#bubbleGradient)" opacity="0.6" />

              {/* Snake-like animated stroke */}
              <path
                d="M50 180 Q 60 150, 90 160 Q 130 170, 140 140"
                stroke="#fff"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="animate-snake-line"
              />

              <text
                x="100"
                y="105"
                textAnchor="middle"
                className="fill-white font-bold text-lg animate-fade-in"
              >
                💬 Chat
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 15px rgba(255,255,255,0.7), 0 0 30px rgba(255,255,255,0.6);
            }
            50% {
              text-shadow: 0 0 30px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.8);
            }
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

          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes chatPop {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
          }

          /* Snake-like moving stroke */
          @keyframes snake-move {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -280;
            }
          }

          @keyframes drawLine {
            0% {
              stroke-dasharray: 0 100;
              stroke-dashoffset: 100;
            }
            100% {
              stroke-dasharray: 100 0;
              stroke-dashoffset: 0;
            }
          }

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

          @keyframes typing {
            from { width: 0 }
            to { width: 21ch }
          }

          @keyframes blinkCaret {
            50% { border-color: transparent }
            100% { border-color: white }
          }

          @keyframes fade-bounce {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes float1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(15px, -20px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-10px, 15px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 10px); }
          }
          @keyframes float4 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-15px, -10px); }
          }
          @keyframes float5 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, 15px); }
          }

          @keyframes floatRotate {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(6px, -6px) rotate(2deg);
            }
            50% {
              transform: translate(0, -12px) rotate(0deg);
            }
            75% {
              transform: translate(-6px, -6px) rotate(-2deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }

          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }

          .animate-chat-pop {
            animation: chatPop 1.2s ease-out forwards;
            transform-origin: center;
          }

          .animate-snake-line {
            stroke-dasharray: 140 140;
            stroke-dashoffset: 0;
            animation: snake-move 4s linear infinite;
          }

          .motion-safe\\:animate-fade-slide-in {
            animation-name: fadeSlideIn;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
          }

          .typing {
            overflow: hidden;
            white-space: nowrap;
            border-right: 4px solid white;
            animation:
              typing 3.5s steps(22) forwards,
              blinkCaret 0.8s step-end infinite;
            max-width: 21ch;
            margin: 0 auto;
          }

          .animate-fade-bounce {
            animation: fade-bounce 1.5s ease forwards;
          }

          .animate-float-rotate {
            animation: floatRotate 6s ease-in-out infinite;
          }
        `}
      </style>
    </main>
  );
};

export default LoginPage;
