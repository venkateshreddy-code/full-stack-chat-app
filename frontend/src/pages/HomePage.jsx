import Sidebar from "../components/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-primary-light via-base-100 to-primary-lighter flex items-center justify-center p-4 dark:bg-gradient-to-br dark:from-primary-dark dark:via-base-900 dark:to-primary-darker">
      <div
        className={`
          w-full max-w-6xl h-[calc(100vh-8rem)] rounded-2xl shadow-2xl
          bg-gradient-to-tr from-base-100/90 to-primary-light/70 dark:from-base-900 dark:to-primary-dark
          transform transition-all duration-700 ease-in-out
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <div className="flex h-full rounded-2xl overflow-hidden shadow-lg">
          {/* Sidebar */}
          <aside
            className="
              w-20 lg:w-72 bg-gradient-to-b from-primary-lighter to-primary-light dark:from-primary-dark dark:to-primary-darker
              shadow-inner border-r border-base-300 dark:border-base-700
              flex-shrink-0
              transition-all duration-500
            "
          >
            <Sidebar />
          </aside>

          {/* Chat main */}
          <main className="flex-1 p-4 bg-base-100 dark:bg-base-900 relative overflow-hidden">
            {/* Chat container */}
            <div
              key="chat-container"
              className="
                absolute inset-0
                transition-opacity duration-500 ease-in-out
                flex flex-col
              "
              style={{
                opacity: selectedUser ? 1 : 0,
                transform: selectedUser ? "translateX(0)" : "translateX(20px)",
                pointerEvents: selectedUser ? "auto" : "none",
              }}
            >
              {selectedUser && <ChatContainer />}
            </div>

            {/* No chat selected */}
            <div
              key="no-chat-container"
              className="
                absolute inset-0
                transition-opacity duration-500 ease-in-out
                flex flex-col items-center justify-center
                px-4
              "
              style={{
                opacity: !selectedUser ? 1 : 0,
                transform: !selectedUser ? "translateX(0)" : "translateX(-20px)",
                pointerEvents: !selectedUser ? "auto" : "none",
              }}
            >
              {!selectedUser && <NoChatSelected />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
