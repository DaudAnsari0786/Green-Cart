import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  LogOut,
  Edit2,
  Camera,
  X,
  Upload,
  Check,
  Trash2,
  AlertCircle,
  Calendar,
  Briefcase,
} from "lucide-react";

const ProfileCard = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Senior Developer",
    avatar:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);

  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);

          setUserData((prev) => ({
            ...prev,
            name: user.name || user.fullName || "John Doe",
            email: user.email || "john@example.com",
            role: user.role || "Senior Developer",
            avatar: user.avatar || prev.avatar,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Cleanup function for upload
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    navigate("/");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditName(userData.name);
  };

  const handleSaveProfile = () => {
    if (editName.trim()) {
      const storedUser = localStorage.getItem("user");
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = {
          ...user,
          name: editName.trim(),
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        const updatedUsers = users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                name: editName.trim(),
              }
            : u,
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setUserData((prev) => ({
          ...prev,
          name: editName.trim(),
        }));
        setIsEditing(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName("");
  };

  // Image Upload Handlers
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadError("");
      setIsCancelled(false);

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setUploadError(
          "Please select a valid image file (JPEG, PNG, GIF, or WEBP)",
        );
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size should be less than 5MB");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatar(event.target.result);
        setShowUploadModal(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.onerror = () => {
        setUploadError("Error reading file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    if (!tempAvatar || isCancelled) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError("");

    let progress = 0;
    const speed = 20;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      progress += speed;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
        completeUpload();
      }
      setUploadProgress(Math.min(progress, 100));
    }, 100);
  };

  const completeUpload = () => {
    if (isCancelled) {
      resetUploadState();
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, avatar: tempAvatar };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, avatar: tempAvatar } : u,
        );

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setUserData((prev) => ({ ...prev, avatar: tempAvatar }));
        setUploadProgress(100);

        setTimeout(() => {
          setShowUploadModal(false);
          setTempAvatar(null);
          setIsUploading(false);
          setUploadProgress(0);
        }, 300);
      }
    } catch (error) {
      setUploadError("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setIsCancelled(true);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setTempAvatar(null);
    setShowUploadModal(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setTempAvatar(null);
    setShowUploadModal(false);
    setIsCancelled(false);
    setUploadError("");
  };

  const handleRemoveAvatar = () => {
    if (
      window.confirm("Are you sure you want to remove your profile picture?")
    ) {
      const defaultAvatar =
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww";

      const storedUser = localStorage.getItem("user");
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, avatar: defaultAvatar };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, avatar: defaultAvatar } : u,
        );

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setUserData((prev) => ({ ...prev, avatar: defaultAvatar }));
      }
    }
  };

  const handleCloseModal = () => {
    if (!isUploading) {
      handleCancelUpload();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showUploadModal && !isUploading) {
        handleCancelUpload();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showUploadModal, isUploading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
        {/* Header Banner */}
        <div className="relative h-24 sm:h-28 md:h-32 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-14 mb-4 sm:mb-6">
            <div className="relative group -mt-2 sm:-mt-4">
              <div className="relative">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 group-hover:scale-105"
                  src={userData.avatar}
                  alt={userData.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww";
                  }}
                />

                {/* Upload overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-black/40">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="text-white p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Change profile picture"
                  >
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Edit button */}
              <button
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors border-2 border-white"
                onClick={() => fileInputRef.current.click()}
                title="Change profile picture"
              >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              </button>

              {/* Remove avatar button */}
              {userData.avatar && !userData.avatar.includes("unsplash") && (
                <button
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 sm:p-1 shadow-md hover:bg-red-600 transition-colors border-2 border-white"
                  onClick={handleRemoveAvatar}
                  title="Remove profile picture"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Name and Role */}
            <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left flex-1">
              {isEditing ? (
                <div className="space-y-2 w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-gray-800 text-lg sm:text-xl font-bold text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90"
                    autoFocus
                    placeholder="Enter your name"
                  />
                  <div className="flex justify-center sm:justify-start gap-2 mt-1">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
                      {userData.name}
                    </h3>
                    <button
                      onClick={handleEditProfile}
                      className="text-white/40 hover:text-white transition-colors flex-shrink-0"
                      title="Edit profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-300 text-xs sm:text-sm mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{userData.role}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* User Details - Only Email */}
          {!isEditing && (
            <div className="mt-2 sm:mt-4">
              <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{userData.email}</span>
              </div>
            </div>
          )}

          {/* Member Since & Actions */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {new Date().getFullYear()}</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 animate-scale-in mx-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Update Profile Picture
              </h3>
              <button
                onClick={handleCancelUpload}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                disabled={isUploading}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Image Preview */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-emerald-500 overflow-hidden">
                  <img
                    src={tempAvatar}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-white border-t-transparent mx-auto mb-1 sm:mb-2"></div>
                        <span className="text-xs sm:text-sm font-semibold">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>
                  )}
                  {isCancelled && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <X className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                        <span className="text-xs sm:text-sm font-semibold">
                          Cancelled
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {/* Error Message */}
              {uploadError && (
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex-1 px-3 py-2 border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4" />
                  Choose Different
                </button>
                <button
                  onClick={handleUploadImage}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading || !tempAvatar || isCancelled}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Upload
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 gap-1">
                <span>Supported: JPEG, PNG, GIF, WEBP</span>
                <span>Max: 5MB</span>
              </div>

              <button
                onClick={handleCancelUpload}
                className="w-full mt-1 text-gray-400 hover:text-red-600 text-sm font-medium transition-colors py-2 px-4 border-2 border-gray-200 rounded-lg hover:border-red-200"
              >
                {isUploading ? "Cancel Upload" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
          }
        }
        .hover\\:shadow-glow:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
