import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  // For triggering letter-by-letter animation on heading
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Welcome to ChatHari";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, current + 1));
      current++;
      if (current === fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        /* Container fadeIn + slideUp */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Floating animation for entire message box */
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Bounce + pulse + glow */
        @keyframes bouncePulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.6));
          }
          50% {
            transform: translateY(-6px) scale(1.05);
            opacity: 0.85;
            filter: drop-shadow(0 0 12px rgba(99, 102, 241, 1));
          }
        }

        /* Gradient color cycling */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Paragraph fade + slide in */
        @keyframes fadeSlideInDelayed {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Letter-by-letter fade in */
        .heading-letter {
          opacity: 0;
          display: inline-block;
          animation: letterFadeIn 0.4s forwards;
        }
        @keyframes letterFadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-900 px-4"
        style={{ animation: "fadeInUp 0.8s ease forwards" }}
      >
        <div
          className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-3xl p-10 max-w-sm w-full shadow-xl"
          style={{
            boxShadow: "0 10px 25px rgba(99,102,241,0.15)",
            animation: "floatGentle 6s ease-in-out infinite",
          }}
        >
          <MessageSquare
            className="w-20 h-20 mb-6 inline-block bg-clip-text text-transparent"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #6366F1, #8B5CF6, #EC4899, #F43F5E, #6366F1)",
              backgroundSize: "1000% 1000%",
              animation:
                "bouncePulse 2.8s ease-in-out infinite, gradientShift 12s ease infinite",
              willChange: "transform, opacity, filter, background-position",
            }}
          />

          <h2
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center"
            aria-label={fullText}
          >
            {displayedText.split("").map((char, i) => (
              <span
                key={i}
                className="heading-letter"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <p
            className="text-center text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xs"
            style={{
              animation: "fadeSlideInDelayed 1s ease forwards",
              animationDelay: "1.2s",
              opacity: 0,
            }}
          >
            Select a conversation from the sidebar to start chatting.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoChatSelected;
