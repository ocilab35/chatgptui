import React, { useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Share,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({
  darkMode,
  setDarkMode,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUserInitial = () => {
    if (!user) {
      // Try to get from localStorage if context user is null
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.profileLetter) return storedUser.profileLetter;
      if (storedUser?.email) return storedUser.email.charAt(0).toUpperCase();
      return "U";
    }
    return (
      user.profileLetter ||
      (user.email ? user.email.charAt(0).toUpperCase() : "U")
    );
  };

  const getDisplayName = () => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) return storedUser.name;
      if (storedUser?.email) return storedUser.email.split("@")[0];
      return "";
    }
    return user.name || (user.email ? user.email.split("@")[0] : "User");
  };

  const getUserColor = () => {
    // If no user, return default blue
    if (!user) return "bg-blue-500";

    // Generate a random color for each user session
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-amber-500",
      "bg-lime-500",
      "bg-emerald-500",
      "bg-cyan-500",
      "bg-violet-500",
      "bg-fuchsia-500",
      "bg-rose-500",
    ];

    // For consistent color per user, use their ID or email hash
    if (user._id) {
      const hash = user._id.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      return colors[Math.abs(hash) % colors.length];
    }

    // Fallback to random color if no ID
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleLogout = () => {
    logout();
    navigate("/Sign-In");
  };

  return (
    <header
      className={`border-b ${
        darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      } py-2 px-4 flex items-center justify-between sticky top-0 z-50 shadow-sm`}
    >
      {/* Left side - Collapse button */}
      <div className="flex items-center">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`p-2 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors duration-200`}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight
              size={20}
              className={darkMode ? "text-gray-300" : "text-gray-600"}
            />
          ) : (
            <ChevronLeft
              size={20}
              className={darkMode ? "text-gray-300" : "text-gray-600"}
            />
          )}
        </button>
      </div>

      {/* Right side - Controls and user */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          className={`p-2 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors duration-200`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Share button */}
        <button
          className={`p-2 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors duration-200`}
          aria-label="Share"
        >
          <Share
            size={20}
            className={darkMode ? "text-gray-300" : "text-gray-600"}
          />
        </button>

        {/* User dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 focus:outline-none">
            <div
              className={`w-9 h-9 ${getUserColor()} rounded-full flex items-center justify-center text-white font-medium text-lg`}
            >
              {getUserInitial()}
            </div>
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 ${
              darkMode ? "bg-gray-700" : "bg-white"
            } hidden group-hover:block z-50 border ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <div
              className={`px-4 py-3 border-b ${
                darkMode ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {getDisplayName()}
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } truncate`}
              >
                {user?.email || "No email"}
              </p>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User size={16} />
              Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings size={16} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                darkMode
                  ? "text-red-400 hover:bg-gray-600"
                  : "text-red-500 hover:bg-gray-100"
              }`}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
