import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const Sidebar = () => {
  // You'll need to replace these with your actual store hooks:
  // const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  // const { onlineUsers, authUser } = useAuthStore();
  // const { theme } = useThemeStore();
  
  const [users] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  
  const onlineUsers = [];
  const authUser = { _id: "current-user" };
  const theme = "light";

  useEffect(() => {
    // getUsers();
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  // Get online count excluding current user
  const onlineCount = onlineUsers.filter((id) => id !== authUser?._id).length;

  if (isUsersLoading) {
    return (
      <div className="h-screen w-20 lg:w-72 border border-base-300 rounded-2xl shadow-md flex flex-col bg-base-100 animate-pulse">
        <div className="border-b border-base-300 p-5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-base-300 rounded"></div>
            <div className="hidden lg:block w-20 h-4 bg-base-300 rounded"></div>
          </div>
        </div>
        <div className="flex-1 p-3 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 bg-base-300 rounded-full"></div>
              <div className="hidden lg:block flex-1 space-y-2">
                <div className="w-24 h-4 bg-base-300 rounded"></div>
                <div className="w-16 h-3 bg-base-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside 
      data-theme={theme}
      className="h-screen w-20 lg:w-72 border border-base-300 rounded-2xl shadow-md flex flex-col bg-base-100 text-base-content transition-all duration-300 animate-in slide-in-from-left-5 duration-600"
    >
      {/* Header */}
      <div className="border-b border-base-300 p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
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
              <div className="w-12 h-6 bg-base-300 rounded-full peer-focus:ring-2 peer-focus:ring-primary peer-checked:bg-primary transition-colors duration-300" />
              <div className="absolute left-0.5 top-0.5 bg-base-100 w-5 h-5 rounded-full shadow peer-checked:translate-x-6 peer-checked:bg-primary-content transition-transform duration-500 ease-out" />
            </div>
            <span className="ml-3 text-sm text-base-content">Show online only</span>
          </label>
          <span className="text-xs text-base-content select-none whitespace-nowrap ml-4">
            ({onlineCount} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 py-3 px-2 space-y-1">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-base-content py-4 select-none">
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
                className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                  isSelected 
                    ? "bg-primary/20 ring-1 ring-primary shadow-sm" 
                    : "hover:bg-primary/10 hover:shadow-sm"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                aria-pressed={isSelected}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover shadow-sm transition-transform hover:scale-110"
                    draggable={false}
                  />
                  {isOnline && (
                    <span
                      aria-label="Online"
                      className="absolute bottom-0 right-0 block w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-base-100 animate-pulse"
                    />
                  )}
                </div>
                <div className="hidden lg:flex flex-col min-w-0 items-start flex-1">
                  <p className={`font-semibold truncate w-full text-left ${
                    isSelected ? "text-primary" : "text-base-content"
                  }`}>
                    {user.fullName}
                  </p>
                  <p className={`text-sm truncate select-none flex-shrink-0 ${
                    isOnline ? "text-green-600" : "text-base-content/70"
                  }`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
