import { useEffect, useState } from "react";
import { X, CheckCircle, MinusCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { theme } = useThemeStore(); // ✅ add this line

  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selectedUser]);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <>
      <style>{`
        /* Fade + slide-down */
        @keyframes fadeSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-15px);
          }
        }
        /* Slow pulse for online ring */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34,197,94, 0.7);
          }
          50% {
            box-shadow: 0 0 8px 4px rgba(34,197,94, 0.3);
          }
        }
        /* Avatar scale + bounce */
        @keyframes avatarBounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        /* Icon pulse + opacity fade */
        @keyframes iconPulseOpacity {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        /* Close button hover/focus */
        .close-btn:hover,
        .close-btn:focus {
          background-color: var(--tw-bg-opacity, 1) #d1d5db; /* gray-300 */
          box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
          transform: scale(1.1);
          transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          outline-offset: 3px;
        }
        .dark .close-btn:hover,
        .dark .close-btn:focus {
          background-color: #374151; /* gray-700 */
          box-shadow: 0 4px 12px rgb(0 0 0 / 0.3);
        }
      `}</style>

      <header
        aria-label={`Chat with ${selectedUser.fullName}`}
  role="banner"
  className={`
    bg-base-100 border-b border-base-300
    flex items-center justify-between px-4 py-3 rounded-b-lg shadow-sm
    transition-transform duration-500 ease-in-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
  `}
  style={{
    animation: mounted ? "fadeSlideDown 400ms ease forwards" : "fadeSlideUp 300ms ease forwards",
  }}
>
        <div className="flex items-center gap-4 min-w-0">
          {/* Avatar with glowing pulse ring + scale bounce */}
          <div
            className="relative"
            style={{
              animation: "avatarBounce 2.5s ease-in-out infinite",
            }}
          >
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={`${selectedUser.fullName} avatar`}
              className="w-12 h-12 rounded-full shadow-md object-cover"
              loading="lazy"
            />
            {isOnline ? (
              <span
                aria-label="Online"
                title="Online"
                className="absolute bottom-0 right-0 block w-5 h-5 rounded-full bg-green-500 ring-4 ring-green-400"
                style={{
                  animation: "pulseGlow 2.5s ease-in-out infinite",
                }}
              />
            ) : (
              <span
                aria-label="Offline"
                title="Offline"
                className="absolute bottom-0 right-0 block w-5 h-5 rounded-full bg-gray-400 ring-2 ring-gray-300 transition-colors duration-500"
              />
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-col min-w-0">
          <h2
  className="font-semibold text-lg text-base-content truncate"
  title={selectedUser.fullName}
>
  {selectedUser.fullName}
</h2>

            <div className="flex items-center gap-2">
              {isOnline ? (
                <CheckCircle
                  className="w-5 h-5 text-green-500"
                  aria-hidden="true"
                  style={{
                    animation: "iconPulseOpacity 2s ease-in-out infinite",
                  }}
                />
              ) : (
                <MinusCircle
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  style={{
                    animation: "iconPulseOpacity 3s ease-in-out infinite",
                  }}
                />
              )}
             <span
  className={`text-sm font-medium transition-colors duration-500 ${
    isOnline
      ? "text-green-600"  // green is fine as is
      : "text-base-content/70"  // use theme-aware text with some opacity
  }`}
>
  {isOnline ? "Online" : "Offline"}
</span>

            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          aria-label="Close chat"
          type="button"
          className="close-btn p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
            transition transform"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </header>
    </>
  );
};

export default ChatHeader;
