import { Users } from "lucide-react";

const shimmerStyle = {
  background:
    "linear-gradient(90deg, #e2e8f0 25%, #f9fafb 50%, #e2e8f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
};

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
      <aside className="h-full w-20 lg:w-72 border-r border-gray-300 bg-white dark:bg-gray-900 transition-all duration-300 flex flex-col shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-300 dark:border-gray-700 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <span className="font-semibold hidden lg:block text-gray-700 dark:text-gray-100">
              Contacts
            </span>
          </div>
        </div>

        {/* Skeleton Contacts */}
        <div className="overflow-y-auto w-full py-3 space-y-4 px-3">
          {skeletonContacts.map((_, idx) => (
            <div
              key={idx}
              className="w-full p-2 rounded-lg flex items-center gap-3 cursor-default select-none"
              style={{ userSelect: "none" }}
            >
              {/* Avatar skeleton with shimmer */}
              <div
                className="w-12 h-12 rounded-full shadow-inner"
                style={shimmerStyle}
              />

              {/* User info skeleton */}
              <div className="hidden lg:flex flex-col gap-2 flex-1 min-w-0">
                <div
                  className="h-4 rounded-md shadow-sm"
                  style={shimmerStyle}
                />
                <div
                  className="h-3 w-20 rounded-md shadow-sm"
                  style={shimmerStyle}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarSkeleton;
