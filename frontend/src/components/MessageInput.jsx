import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Image, Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [shakeSend, setShakeSend] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Manage showing preview with fade and scale
  useEffect(() => {
    if (imagePreview) {
      setShowPreview(true);
    } else {
      const timeout = setTimeout(() => setShowPreview(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [imagePreview]);

  // Handle disabled send button shake animation trigger
  const handleSendClick = (e) => {
    if (!text.trim() && !imagePreview) {
      e.preventDefault();
      // Trigger shake animation
      setShakeSend(true);
      setTimeout(() => setShakeSend(false), 500);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) {
      // Optionally show a toast or alert here for invalid file
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <style>{`
        /* Image preview fade & scale */
        .preview-enter {
          opacity: 0;
          transform: scale(0.95);
        }
        .preview-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .preview-exit {
          opacity: 1;
          transform: scale(1);
        }
        .preview-exit-active {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 300ms ease, transform 300ms ease;
          pointer-events: none;
        }

        /* Input glow pulse on focus */
        @keyframes inputGlowPulse {
          0%, 100% {
            box-shadow: 0 0 6px 2px rgba(99,102,241, 0.6);
          }
          50% {
            box-shadow: 0 0 10px 4px rgba(99,102,241, 0.9);
          }
        }
        input:focus {
          animation: inputGlowPulse 2.5s ease-in-out infinite;
          border-color: #6366f1; /* indigo-500 */
        }

        /* Buttons hover and focus effects */
        .btn-animated {
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-animated:hover:not(:disabled),
        .btn-animated:focus-visible:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgb(99 102 241 / 0.5); /* indigo shadow */
        }
        .btn-animated:active:not(:disabled) {
          transform: scale(0.95);
          box-shadow: 0 3px 6px rgb(99 102 241 / 0.4);
        }

        /* Send button shake when disabled and clicked */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.5s ease;
        }

        /* Placeholder color transition */
        input::placeholder {
          transition: color 0.3s ease;
        }
        input:focus::placeholder {
          color: rgba(99,102,241, 0.5); /* lighter indigo */
        }
      `}</style>

     <div className="p-4 w-full bg-base-100 text-base-content">

        {(imagePreview || showPreview) && (
          <div
            className={`mb-3 flex items-center gap-3 
              ${imagePreview ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
              transition-all duration-300 ease-in-out
            `}
          >
            <div className="relative group">
              <img
                src={imagePreview || ""}
                alt="Preview"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 transition-transform duration-300 group-hover:scale-[1.03]"
                draggable={false}
              />
              <button
                onClick={removeImage}
                type="button"
                aria-label="Remove image preview"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-md
                  hover:bg-red-500 hover:text-white transition transform active:scale-90"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
               className="w-full rounded-lg border border-base-300 bg-base-200
    px-4 py-2
    placeholder:text-base-content/50
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
    transition-all duration-300"
/>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`hidden sm:flex btn btn-circle justify-center items-center
                bg-transparent border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400
                hover:bg-indigo-100 dark:hover:bg-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-300
                active:scale-90 transition-transform duration-200 btn-animated`}
              aria-label="Upload image"
            >
              <Image size={20} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            onClick={handleSendClick}
            className={`btn btn-sm btn-circle flex justify-center items-center
              bg-indigo-600 text-white disabled:bg-indigo-300 disabled:text-white/70
              hover:bg-indigo-700 active:scale-90 transition-transform duration-200
              shadow-md btn-animated
              ${shakeSend ? "shake" : ""}`}
            aria-label="Send message"
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
