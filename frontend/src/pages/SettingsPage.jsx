import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "hey! How's it going?", isSent: false, time: "11:02 AM" },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true, time: "11:03 AM" },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  // For animating messages on mount
  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= PREVIEW_MESSAGES.length) {
        clearInterval(interval);
        return;
      }
      setVisibleMessages((msgs) => [...msgs, PREVIEW_MESSAGES[i]]);
      i++;
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200 text-base-content flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-3">Theme</h2>
      <p className="mb-8 text-sm text-gray-500 max-w-md text-center">
        Choose a theme for your chat interface
      </p>

      {/* Theme Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-12 max-w-4xl w-full px-4">
        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`
              p-3 rounded-md border font-semibold text-sm
              transition-transform transition-colors duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${theme === t 
                ? "border-indigo-600 bg-indigo-600 text-white shadow-lg transform scale-105" 
                : "border-gray-300 bg-white hover:bg-indigo-50 hover:text-indigo-700"
              }
              `}
            >
            {t}
          </button>
        ))}
      </div>

      {/* Preview Chat */}
      <div
        className="
          max-w-md w-full bg-base-100 rounded-2xl shadow-xl p-6
          flex flex-col
          transition-shadow duration-300
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-300 pb-3">
          <div>
            <p className="font-semibold text-lg">John Doe</p>
            <p
              className="
                text-xs text-green-500 font-semibold flex items-center gap-2
                animate-pulse
              "
            >
              ● Online
            </p>
          </div>
          <span className="text-xs text-gray-500 select-none">Now</span>
        </div>

        {/* Messages List */}
        <div className="flex flex-col space-y-3 mb-6">
          {visibleMessages.length === 0
            ? null
            : visibleMessages.map((msg) => {
                if (!msg) return null;
                return (
                  <div
                    key={msg.id}
                    className={`
                      p-3 rounded-lg max-w-[75%] relative text-sm shadow-md
                      transition-transform transition-opacity duration-500 ease-out
                      ${
                        msg.isSent
                          ? "self-end bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "self-start bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
                      }
                    `}
                    style={{
                      opacity: 1,
                      transform: "translateY(0)",
                      animation: "fadeSlideIn 0.5s ease forwards",
                    }}
                  >
                    {msg.content}
                    <span className="block text-xs text-right mt-1 opacity-70 select-none">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
        </div>

        {/* Input and Send */}
        <div className="flex items-center border-t pt-3">
          <input
            type="text"
            placeholder="Type a message"
            disabled
            className="
              flex-grow px-3 py-2 rounded-lg border border-gray-300 text-sm bg-base-100
              cursor-not-allowed opacity-60
              transition-opacity duration-300
            "
          />
          <Send className="ml-3 w-6 h-6 text-gray-400 opacity-60 transition-colors duration-300" />
        </div>
      </div>

      {/* Animations styles */}
      <style>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
