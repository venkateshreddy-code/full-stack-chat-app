import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";

// Hamburger icon component
const HamburgerIcon = ({ open }) => (
  <svg
    className="w-8 h-8 text-primary transition-transform duration-500 ease-in-out"
    viewBox="0 0 24 24"
  >
    <rect
      x="3"
      y={open ? 11 : 6}
      width="18"
      height="2"
      rx="1"
      fill="currentColor"
      className={`transform origin-center transition-transform duration-500 ${
        open ? "rotate-45" : "rotate-0"
      }`}
    />
    <rect
      x="3"
      y="11"
      width="18"
      height="2"
      rx="1"
      fill="currentColor"
      className={`transition-opacity duration-500 ${
        open ? "opacity-0" : "opacity-100"
      }`}
    />
    <rect
      x="3"
      y={open ? 11 : 16}
      width="18"
      height="2"
      rx="1"
      fill="currentColor"
      className={`transform origin-center transition-transform duration-500 ${
        open ? "-rotate-45" : "rotate-0"
      }`}
    />
  </svg>
);

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAuthPage) return null; // Hide navbar on login/signup pages

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 pointer-events-none",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Header wrapper with scroll shadow and gradient */}
      <header
        data-theme={theme}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-shadow duration-300 backdrop-blur-md",
          scrolled
            ? "shadow-lg bg-primary text-primary-content"
            : "bg-base-100 text-base-content"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 font-extrabold text-2xl tracking-wide text-primary"
              aria-label="ChatHari Home"
            >
              <MessageSquare className="w-7 h-7 fill-current" />
              <span>ChatHari</span>
            </Link>

            {/* Desktop Menu */}
            <div
              className={clsx(
                "hidden md:flex items-center space-x-8 text-lg font-semibold",
                scrolled ? "text-primary-content" : "text-base-content"
              )}
            >
              {authUser && (
                <>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-110"
                  >
                    <Settings className="w-6 h-6 fill-current" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-110"
                  >
                    <User className="w-6 h-6 fill-current" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    type="button"
                    className="flex items-center space-x-2 hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-110"
                  >
                    <LogOut className="w-6 h-6 fill-current" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>

        {/* Mobile Sliding Menu */}
        <div
          className={clsx(
            "fixed top-16 left-0 w-full max-w-xs h-screen backdrop-blur-md bg-base-200 bg-opacity-80 border border-base-300 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          role="menu"
          aria-label="Mobile navigation"
          data-theme={theme}
        >
          <nav className="flex flex-col mt-8 space-y-6 px-6 text-base-content">
            {authUser && (
              <>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 font-semibold text-lg hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-105"
                  role="menuitem"
                >
                  <Settings className="w-6 h-6 fill-current" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 font-semibold text-lg hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-105"
                  role="menuitem"
                >
                  <User className="w-6 h-6 fill-current" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 font-semibold text-lg hover:text-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary rounded transition transform hover:scale-105 w-full text-left"
                  type="button"
                  role="menuitem"
                >
                  <LogOut className="w-6 h-6 fill-current" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
