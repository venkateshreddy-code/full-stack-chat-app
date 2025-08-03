import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { currentUser } = useAuthStore();
  const { theme } = useThemeStore();
  const [hoveredUserId, setHoveredUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className={`h-full w-[320px] overflow-y-auto border-r ${theme === "light" ? "bg-white border-gray-200" : "bg-[#1e1e1e] border-gray-700"} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <Users className="w-5 h-5" />
        <h2 className="font-semibold text-base">All Users</h2>
      </div>

      {isUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        users
          .filter((user) => user._id !== currentUser._id)
          .map((user) => (
            <div
              key={user._id}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                selectedUser?._id === user._id
                  ? "bg-blue-100 dark:bg-blue-900"
                  : hoveredUserId === user._id
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              }`}
              onClick={() => handleUserClick(user)}
              onMouseEnter={() => setHoveredUserId(user._id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Sidebar;
