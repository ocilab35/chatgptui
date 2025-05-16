import React, { useState } from 'react';
import './ScrollbarStyles.css';

const SettingsDrawer = ({ isOpen, onClose, darkMode }) => {
  const [isModelImprovementOn, setIsModelImprovementOn] = useState(true);
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-gray-700 bg-opacity-30'} flex items-center justify-center z-50`}>
      <div className={`w-full max-w-[600px] rounded-lg overflow-y-auto p-6 max-h-[90vh] shadow-xl chat-scrollbar ${darkMode ? 'bg-[#282a36] text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-normal">Settings</h2>
          <button onClick={onClose} className="text-3xl">&times;</button>
        </div>

        <div className="space-y-6">
          {/* Name Section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xl">Name</span>
              <div className="flex items-center">
                <span className="mr-2">Hafiza Maham</span>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <span className="text-blue-500 text-xs font-bold">G</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Address Section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xl">Email address</span>
              <span>hafi********032@gmail.com</span>
            </div>
          </div>

          {/* Improve Model section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center mb-2">
              {/* Left side: Text content */}
              <div>
                <span className="text-xl">Improve the model for everyone</span>
                <p className="text-gray-400">
                  Allow your content to be used to train our models and <br /> improve our services. We secure your data privacy.
                </p>
              </div>
              {/* Right side: Toggle switch */}
             <div className="flex justify-end mt-2">
              <div
                onClick={() => setIsModelImprovementOn(!isModelImprovementOn)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isModelImprovementOn ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isModelImprovementOn ? 'translate-x-3' : 'translate-x-0'
                    }`}
                ></div>
              </div>
            </div>
            </div>
          </div>


          {/* Notification section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center mb-2">
              {/* Left side: Text content */}
              <div>
                <span className="text-xl">Notification</span>
                <p className="text-gray-400">
                  Turn on notifications to stay updated with important <br /> account changes
                </p>
              </div>

              {/* Right side: Toggle switch */}
             <div className="flex justify-end mt-2">
              <div
                onClick={() => setIsNotificationOn(!isNotificationOn)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isNotificationOn ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isNotificationOn ? 'translate-x-3' : 'translate-x-0'
                    }`}
                ></div>
              </div>
            </div>
            </div>
          </div>

          {/* Current Version Section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xl">Current Version</span>
              <span>1.2.3</span>
            </div>
          </div>

          {/* Invite Friends Section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xl">Invite Friends</span>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md flex items-center">
                Share
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Delete All Chats Section */}
          <div className="pb-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xl">Delete all chats</span>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md">
                Delete all
              </button>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="pb-6">
            <div className="flex justify-between items-center">
              <span className="text-xl">Delete account</span>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;