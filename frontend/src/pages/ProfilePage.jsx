import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Trigger fade/scale animation on mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr
        from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900
        p-6 space-y-10 text-gray-900 dark:text-gray-100
        transition-all duration-700 ease-in-out
        ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
    >
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
          Your profile information
        </p>
      </header>

      {/* Avatar with glowing/pulse on upload and inline label */}
      <div className="relative flex flex-col items-center gap-4 pb-6">
        <div
          className={`
            rounded-full p-1
            ${isUpdatingProfile ? "animate-pulse shadow-lg shadow-indigo-500/70" : "shadow-md"}
            transition-shadow duration-500 ease-in-out
            ring-4 ring-indigo-300 dark:ring-indigo-600
          `}
          aria-live="polite"
          aria-busy={isUpdatingProfile}
        >
          <img
            src={selectedImg || authUser?.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover select-none"
            loading="lazy"
            draggable={false}
            key={selectedImg || authUser?.profilePic} // retrigger animation on change
          />
        </div>

        {/* Inline text + camera icon */}
        <label
          htmlFor="avatar-upload"
          className="flex items-center gap-2 cursor-pointer select-none text-gray-700 dark:text-gray-300
            hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
          aria-label="Upload new profile picture"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              document.getElementById("avatar-upload")?.click();
            }
          }}
        >
          <span className="text-sm">
            {isUpdatingProfile
              ? "Uploading your new photo..."
              : "Click to upload your photo"}
          </span>
          <Camera
            className="w-5 h-5 text-indigo-600 dark:text-indigo-400 hover:scale-110 active:scale-95
            transition-transform duration-300 animate-bounce-slow hover:animate-bounce"
          />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
        </label>
      </div>

      {/* Info card with gradients and shadows */}
      <section
        className="
          w-full max-w-md space-y-6
          bg-gradient-to-br from-white to-indigo-50 dark:from-indigo-900 dark:to-indigo-800
          rounded-3xl p-8
          shadow-xl
          transition-shadow duration-500 ease-in-out
        "
      >
        {/* Full Name */}
        <div className="flex items-center space-x-3">
          <User className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-lg">Full Name</span>
        </div>
        <p className="pl-10 text-gray-800 dark:text-gray-300 text-base truncate">
          {authUser?.fullName || "N/A"}
        </p>

        {/* Email */}
        <div className="flex items-center space-x-3 mt-6">
          <Mail className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-lg">Email Address</span>
        </div>
        <p className="pl-10 text-gray-800 dark:text-gray-300 text-base truncate">
          {authUser?.email || "N/A"}
        </p>

        {/* Account Info */}
        <h2 className="font-semibold text-2xl mt-10 mb-4 border-b border-indigo-300 pb-2 dark:border-indigo-600">
          Account Information
        </h2>

        <div className="flex justify-between text-indigo-700 dark:text-indigo-300 font-medium">
          <span>Member Since</span>
          <span>{authUser?.createdAt ? authUser.createdAt.split("T")[0] : "N/A"}</span>
        </div>

        <div className="flex justify-between text-indigo-700 dark:text-indigo-300 font-medium">
          <span>Account Status</span>
          <span>Active</span>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
