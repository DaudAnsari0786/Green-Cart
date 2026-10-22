import React, { useState } from "react";
import {
  AtSign,
  LockIcon,
  User,
  UserPlus,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "",
  });

  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (pass) => {
    let score = 0;
    let message = "";
    let color = "";

    if (pass.length >= 8) score++;
    if (pass.match(/[a-z]/)) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^a-zA-Z0-9]/)) score++;

    if (pass.length === 0) {
      message = "Enter a password";
      color = "text-gray-400";
    } else if (score <= 2) {
      message = "Weak password";
      color = "text-red-500";
    } else if (score === 3) {
      message = "Fair password";
      color = "text-yellow-500";
    } else if (score === 4) {
      message = "Good password";
      color = "text-blue-500";
    } else {
      message = "Strong password";
      color = "text-green-500";
    }

    return { score, message, color };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!name.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (existingUsers.some((user) => user.email === email)) {
        setError("User with this email already exists. Please login.");
        setLoading(false);
        return;
      }

      // Create new user with complete profile
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email,
        password, // In real app, this should be hashed
        avatar:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
        role: "Senior Developer",
        posts: 142,
        followers: 1200,
        following: 890,
        createdAt: new Date().toISOString(),
      };

      // Save to users array
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Auto-login after signup (exclude password)
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role,
        posts: newUser.posts,
        followers: newUser.followers,
        following: newUser.following,
        createdAt: newUser.createdAt,
      };

      localStorage.setItem("user", JSON.stringify(userSession));

      setSuccess("Account created successfully! 🎉");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordStrength({ score: 0, message: "", color: "" });

      // Navigate to home after 1.5 seconds
      setTimeout(() => {
        navigate("/Home");
      }, 1500);
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900 p-4 sm:p-6">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              <User className="inline w-4 h-4 mr-1 text-green-500" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-[5px] border border-gray-200/80 bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-200/50 outline-none"
              required
              disabled={loading}
              autoComplete="name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              <AtSign className="inline w-4 h-4 mr-1 text-green-500" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 rounded-[5px] border border-gray-200/80 bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-200/50 outline-none"
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
              <LockIcon className="inline w-4 h-4 mr-1 text-green-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 rounded-[5px] border border-gray-200/80 bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-200/50 outline-none pr-10"
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${passwordStrength.color}`}
                  >
                    {passwordStrength.message}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              <LockIcon className="inline w-4 h-4 mr-1 text-green-500" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 rounded-[5px] border bg-white/70 text-gray-800 placeholder:text-gray-400 transition duration-200 outline-none pr-10 ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-400 focus:ring-red-200/50 focus:border-red-400"
                    : confirmPassword && password === confirmPassword
                      ? "border-green-400 focus:ring-green-200/50 focus:border-green-400"
                      : "border-gray-200/80 focus:border-green-400 focus:ring-2 focus:ring-green-200/50"
                }`}
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Password match indicator */}
            {confirmPassword && (
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword ? (
                  <>
                    <CheckCircle className="w-3 h-3" /> Passwords match
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" /> Passwords do not match
                  </>
                )}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-[5px] shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition duration-200 flex items-center justify-center gap-2 text-lg tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                Creating account...
              </>
            ) : (
              <>
                Sign Up
                <UserPlus className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
