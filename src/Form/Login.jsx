import { AtSign, Lock, LogIn } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get all registered users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user with matching email and password
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        // Store user session (excluding password)
        const userSession = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar:
            user.avatar ||
            "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
          role: "Senior Developer",
          posts: 142,
          followers: 1200,
          following: 890,
          createdAt: user.createdAt,
        };

        localStorage.setItem("user", JSON.stringify(userSession));

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        console.log("Login successful:", { email, rememberMe });

        // Navigate to home page
        navigate("/Home");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear any existing error when user types
  const handleInputChange = (setter) => (e) => {
    setError("");
    setter(e.target.value);
  };

  return (
    

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-green-900/20 p-6 sm:p-8 md:p-10 border border-white/40 transition-transform duration-200 hover:scale-[1.01]">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                <AtSign className="inline w-4 h-4 mr-1 text-green-600" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                placeholder="user@example.com"
                className="w-full px-2 py-2 rounded-[5px] border border-gray-200/80 bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-200/50 outline-none"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                <Lock className="inline w-4 h-4 mr-1 text-green-600" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="••••••••"
                className="w-full px-2 py-2 rounded-[5px] border border-gray-200/80 bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-200/50 outline-none"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex flex-wrap xs:flex-row items-start xs:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-400 cursor-pointer"
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-800 underline-offset-2 hover:underline decoration-green-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Forgot password clicked");
                  alert("Password reset link sent to your email");
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button - Green Theme */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 rounded-[5px] shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition duration-200 flex items-center justify-center gap-2 text-lg tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-700 font-semibold hover:text-green-600 transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
