import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const bubbleData = [
  { id: 1, text: 'Hello!', side: 'left' },
  { id: 2, text: 'Hi there 👋', side: 'right' },
  { id: 3, text: 'How are you?', side: 'left' },
  { id: 4, text: "I'm great, thanks!", side: 'right' },
  { id: 5, text: 'Ready to chat?', side: 'left' },
];

const AuthImagePattern = ({ title, subtitle }) => {
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const nextBubble = bubbleData[i];
      if (nextBubble) {
        setVisibleBubbles((prev) => [...prev, nextBubble]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowTitle(true), 600); // Show title after chat
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden lg:flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-indigo-200 via-blue-100 to-purple-200 p-10 xl:p-16">
      <div className="absolute w-[500px] h-[500px] bg-purple-300/20 blur-3xl rounded-full animate-pulse-slow -z-10 top-1/4 left-1/3"></div>

      <div className="max-w-md w-full text-center space-y-10">
        {/* Chat Bubbles */}
        <div className="flex flex-col gap-4 min-h-[280px]">
          {visibleBubbles.map(({ id, text, side }) => (
            <div
              key={id}
              className={`
                max-w-xs px-5 py-3 rounded-2xl text-base-content shadow-xl transition-transform duration-300
                ${side === 'left'
                  ? 'bg-white/80 self-start text-gray-800 animate-bubbleLeft'
                  : 'bg-gradient-to-br from-purple-500 to-indigo-500 self-end text-white animate-bubbleRight'}
              `}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Title and Subtitle */}
        {showTitle && (
          <div className="space-y-2 mt-10 animate-fadeInUp">
            <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text animate-titleZoom hover:drop-shadow-glow">
              {title}
            </h2>
            <p className="text-lg text-gray-700 animate-subSlide pulse-soft">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes bubbleLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-bubbleLeft {
          animation: bubbleLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes bubbleRight {
          0% {
            opacity: 0;
            transform: translateX(60px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-bubbleRight {
          animation: bubbleRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes titleZoom {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-titleZoom {
          animation: titleZoom 0.8s ease-out forwards;
        }

        @keyframes subSlide {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-subSlide {
          animation: subSlide 0.8s ease-out forwards;
        }

        @keyframes pulseSoft {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }
        .pulse-soft {
          animation: pulseSoft 4s ease-in-out infinite;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.6));
        }

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s infinite;
        }
      `}</style>
    </aside>
  );
};

AuthImagePattern.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthImagePattern;
