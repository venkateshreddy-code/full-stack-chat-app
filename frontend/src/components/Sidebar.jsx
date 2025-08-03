import { useEffect, useState } from "react";
import { Users } from "lucide-react";

// Mock data for demonstration
const mockUsers = Array.from({ length: 20 }, (_, i) => ({
  _id: `user-${i}`,
  fullName: `User ${i + 1}`,
  profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
}));

const mockOnlineUsers = ["user-1", "user-3", "user-5", "user-7", "user-9"];

const Sidebar = () => {
  const [users] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [onlineUsers] = useState(mockOnlineUsers);
  const [theme] = useState('light');

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const onlineCount = onlineUsers.length;

  return (
    <>
      <style>{`
        @keyframes sidebarSlideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94, 0.6); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94, 0); }
        }
        .ping-badge { animation: pulseGlow 2s infinite ease-in-out; }
        .user-item { animation: fadeInUp 0.4s ease forwards; }
        .profile-pic:hover { animation: bounceHover 0.4s ease; }
        @keyframes bounceHover {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        /* Fixed scrollbar container */
        .scroll-container {
          flex: 1;
          min-height: 0;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        
        .scroll-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 12px;
        }
        
        /* Fade gradient overlay - only show when content overflows */
        .scroll-container::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9));
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .scroll-container.has-overflow::after {
          opacity: 1;
        }
        
        [data-theme='dark'] .scroll-container::after {
          background: linear-gradient(to bottom, rgba(17,24,39,0), rgba(17,24,39,0.9));
        }
        
        /* Custom scrollbar styling */
        .scroll-content {
          scrollbar-width: thin;
          scrollbar-color: rgba(100,116,139,0.4) transparent;
        }
        
        .scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scroll-content::-webkit-scrollbar-thumb {
          background-color: rgba(100,116,139,0.4);
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        
        .scroll-content::-webkit-scrollbar-thumb:hover {
          background-color: rgba(100,116,139,0.6);
        }
        
        [data-theme="dark"] .scroll-content::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
        }
        
        [data-theme="dark"] .scroll-content::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255,255,255,0.3);
        }
        
        /* Ensure smooth scrolling */
        .scroll-content {
          scroll-behavior: smooth;
        }
      `}</style>

      <aside
        data-theme={theme}
        className="flex flex-col h-screen w-20 lg:w-72 border border-gray-200 rounded-2xl shadow-md bg-white text-gray-900 transition-all duration-300"
        style={{ animation: "sidebarSlideIn 0.6s ease-out forwards" }}
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-5 flex flex-col gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-lg truncate hidden lg:block select-none">
              Contacts
            </span>
          </div>

          {/* Toggle */}
          <div className="hidden lg:flex items-center justify-between">
            <label htmlFor="toggleOnline" className="flex items-center cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggleOnline"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Show online users only"
                />
                <div className="w-12 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-600 peer-checked:bg-blue-600 transition-colors duration-300" />
                <div
                  className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow peer-checked:translate-x-6 peer-checked:bg-blue-700 transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
              </div>
              <span className="ml-3 text-sm text-gray-700">Show online only</span>
            </label>
            <span className="text-xs text-gray-500 select-none whitespace-nowrap ml-4">
              ({onlineCount} online)
            </span>
          </div>
        </div>

        {/* Users List - Fixed scrollable container */}
        <div 
          className="scroll-container"
          ref={(el) => {
            if (el) {
              const scrollContent = el.querySelector('.scroll-content');
              if (scrollContent) {
                const hasOverflow = scrollContent.scrollHeight > scrollContent.clientHeight;
                el.classList.toggle('has-overflow', hasOverflow);
              }
            }
          }}
        >
          <div
            className="scroll-content"
            style={{ animation: "fadeInUp 0.6s ease forwards" }}
          >
            {filteredUsers.length === 0 ? (
              <div className="text-center text-gray-500 py-4 select-none">
                No users to display
              </div>
            ) : (
              filteredUsers.map((user, index) => {
                const isSelected = selectedUser?._id === user._id;
                const isOnline = onlineUsers.includes(user._id);

                return (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`user-item w-full flex items-center gap-4 p-3 mb-2 rounded-lg transition duration-200 ease-in-out ${
                      isSelected 
                        ? "bg-blue-50 ring-1 ring-blue-600 text-blue-900" 
                        : "hover:bg-gray-50"
                    } transform focus:outline-none focus:ring-2 focus:ring-blue-600`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-pressed={isSelected}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full object-cover shadow-sm transition-transform profile-pic"
                        draggable={false}
                      />
                      {isOnline && (
                        <span
                          aria-label="Online"
                          className="ping-badge absolute bottom-0 right-0 block w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-white"
                        />
                      )}
                    </div>
                    <div className="hidden lg:flex flex-col min-w-0 items-start">
                      <p className={`font-semibold truncate ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                        {user.fullName}
                      </p>
                      <p className={`text-sm truncate select-none flex-shrink-0 ${isOnline ? "text-green-600" : "text-gray-500"}`}>
                        {isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
