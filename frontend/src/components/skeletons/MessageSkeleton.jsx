import React from "react";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => {
        const isSender = idx % 2 !== 0;

        return (
          <div
            key={idx}
            className={`flex items-end gap-3 ${
              isSender ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 shadow-inner animate-pulse" />

            {/* Message bubble */}
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-2xl shadow-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden`}
            >
              <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded shimmer-line"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded shimmer-line"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
