import { Play, Share2, ChevronLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-close sidebar on small screens
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    // Set initial state based on window size
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 fixed top-0 left-0 right-0 bg-white z-20 ">
        <div className="flex items-center">
          {/* Toggle Button on the far left */}
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition duration-200 mr-3"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} className="text-gray-700" />
            ) : (
              <Menu size={20} className="text-gray-700" />
            )}
          </button>

          {/* Logo */}
          <div className="font-bold text-xl md:text-2xl">Logo</div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-6 md:h-6"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Link to="/Sign-In">
            <button className="px-3 py-1 md:px-6 md:py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs md:text-sm font-medium">
              Log in
            </button>
          </Link>
          <Link to="/Sign-Up">
            <button className="px-3 py-1 md:px-6 md:py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-xs md:text-sm font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
      {/* Main content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - conditionally rendered based on isSidebarOpen state */}
        {isSidebarOpen && (
          <div className="fixed top-14 md:top-16 left-0 h-screen w-52 md:w-64 bg-white pt-4 md:pt-6 transition-all duration-300 ease-in-out z-10 shadow-md md:shadow-none">
            <div className="px-2 md:px-4 space-y-1 md:space-y-2">
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                Research
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                Safety
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                ChatGPT
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                Sora
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                API Platform
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                For Business
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                Stories
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                Company
              </a>
              <a
                href="#"
                className="block px-3 md:px-4 py-2 hover:bg-gray-100 rounded-md text-xs md:text-sm"
              >
                News
              </a>
            </div>
          </div>
        )}

        {/* Content area */}
        <div
          className={`flex-1 ${
            isSidebarOpen ? "ml-0 md:ml-64" : "ml-0"
          } px-4 md:px-6 pt-6 md:pt-10 flex flex-col items-center transition-all duration-300`}
        >
          <div className="text-center max-w-xl md:max-w-3xl mx-auto">
            <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-8">
              Release
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-12 leading-tight">
              Most advanced system, producing safer and more useful responses
            </h1>

            <div className="flex justify-center mt-8 md:mt-12 w-full">
              <div className="w-full max-w-sm md:max-w-2xl rounded-xl border border-gray-200 shadow-sm">
                <div className="bg-white rounded-t-xl p-3 md:p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm md:text-base">Logo</div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="md:w-4 md:h-4"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="md:w-4 md:h-4"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-6 bg-gray-50 min-h-24 md:min-h-32 flex flex-col justify-end">
                  <div className="bg-gray-100 p-2 md:p-3 rounded-lg mb-3 md:mb-4 max-w-xs md:max-w-md self-start">
                    <p className="text-xs md:text-sm">
                      How can I use Logo to improve my workflow?
                    </p>
                  </div>
                  <div className="bg-blue-100 p-2 md:p-3 rounded-lg mb-3 md:mb-4 max-w-xs md:max-w-md self-end">
                    <p className="text-xs md:text-sm">
                      Logo can help streamline your workflow by automating
                      repetitive tasks, generating drafts, summarizing long
                      documents, and providing creative suggestions. You can
                      integrate it through the API or use it directly in ChatGPT
                      Plus.
                    </p>
                  </div>
                </div>
                <div className="p-2 md:p-4 border-t border-gray-200 bg-white rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Message ChatGPT..."
                      className="flex-1 border-0 bg-gray-100 rounded-full py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-gray-200 hover:bg-gray-300 p-2 md:p-3 rounded-full transition-colors">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="md:w-4 md:h-4"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-4 md:mt-6 gap-3 md:gap-6">
              <button className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-full px-3 md:px-6 py-2 md:py-3 hover:bg-gray-200 transition-colors text-xs md:text-sm">
                <Play size={14} className="md:w-5 md:h-5" />
                <span className="font-medium">Listen to article</span>
                <span className="ml-1 md:ml-2 text-gray-500">1:37</span>
              </button>
              <button className="flex items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-full transition-colors text-xs md:text-sm">
                <Share2 size={14} className="md:w-5 md:h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>

            <div className="mt-4 md:mt-8 flex justify-center opacity-70">
              <div className="text-xs md:text-sm text-gray-500">
                Try GPT-4 with your existing ChatGPT Plus subscription
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
