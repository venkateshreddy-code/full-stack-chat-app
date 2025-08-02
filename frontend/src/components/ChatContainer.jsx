import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader.jsx";
import MessageInput from "../components/MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
    
  const messageEndRef = useRef(null);
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser, theme } = useAuthStore();

  // For triggering pulse animation on new messages
  const [latestMessageId, setLatestMessageId] = useState(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messages?.length) {
      setLatestMessageId(messages[messages.length - 1]._id);
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto transition-colors duration-500 ease-in-out" data-theme={theme}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer utilities {
          /* Custom fadeSlideIn with bounce */
          @keyframes fadeSlideInBounce {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            60% {
              opacity: 1;
              transform: translateY(-5px);
            }
            80% {
              transform: translateY(2px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Avatar pulse on new message */
          @keyframes pulseScale {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }

          /* Image shimmer */
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          /* Focus ring and animation on message bubble */
          .message-focus:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.6);
            animation: pulseScale 0.8s ease-in-out;
          }
        }
      `}</style>

     <div className="flex-1 flex flex-col overflow-auto bg-base-100 text-base-content transition-colors duration-500 ease-in-out">

        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isSender = message.senderId === authUser._id;
            const isLatest = message._id === latestMessageId;

            return (
              <div
                key={message._id}
                className={`chat ${isSender ? "chat-end" : "chat-start"} 
                  animate-fadeSlideInBounce 
                  duration-700 
                  ease-out
                  focus:outline-none
                  message-focus
                  `}
                tabIndex={0}
                style={{ animationName: "fadeSlideInBounce" }}
              >
                <div
                  className="chat-image avatar"
                  style={{
                    animation: isLatest ? "pulseScale 1s ease-in-out" : "none",
                    transformOrigin: "center center",
                  }}
                >
                  <div className="size-10 rounded-full border border-gray-300 dark:border-gray-700 overflow-hidden">
                    <img
                      src={
                        isSender ? authUser.profilePic || "/avatar.png" : selectedUser?.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1 flex justify-between items-center">
                  <time className="text-xs opacity-50 ml-1 select-none">{formatMessageTime(message.createdAt)}</time>
                </div>
                <div
                  className={`
                    chat-bubble flex flex-col
                    transition-transform duration-200 ease-in-out
                    hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-400/30
                    hover:bg-indigo-50 dark:hover:bg-indigo-900
                    cursor-pointer
                    rounded-lg
                    px-3 py-2
                    select-text
                    focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2
                        transition-transform duration-500 ease-in-out
                        hover:scale-105
                        hover:brightness-110
                        hover:drop-shadow-lg
                        cursor-pointer
                        "
                      style={{
                        background: `linear-gradient(
                          90deg,
                          rgba(255,255,255,0.1) 0%,
                          rgba(255,255,255,0.3) 50%,
                          rgba(255,255,255,0.1) 100%
                        )`,
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s infinite",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.animation = "none";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.animation = "shimmer 2s infinite";
                      }}
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>
        <MessageInput />
      </div>
    </>
  );
};

export default ChatContainer;
