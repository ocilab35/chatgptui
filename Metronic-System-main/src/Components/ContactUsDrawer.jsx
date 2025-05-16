import React from 'react';
import './ScrollbarStyles.css';

const ContactUsDrawer = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  // Background and border colors for input based on dark mode
  const inputBgClass = darkMode ? "bg-[#282A36]" : "bg-white";
  const inputTextClass = darkMode ? "text-white" : "text-black";
  const inputBorderClass = darkMode ? "border border-gray-600" : "border border-gray-700";

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-gray-700 bg-opacity-30'} flex items-center justify-center z-50`}>
      <div className={`w-full max-w-[850px] rounded-lg overflow-y-auto p-6 max-h-[90vh] shadow-xl chat-scrollbar ${darkMode ? 'bg-[#282A36] text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-normal">Contact US</h2>
          <button onClick={onClose} className="text-3xl">&times;</button>
        </div>

        <div className="space-y-6">
          {/* Contact Support Header */}
          <div className="pb-4">
            <h3 className="text-xl font-normal">Contact Support</h3>
            <p className="text-gray-400 mt-2">
              Get in touch with our support team for assistance.
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-4"></div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-gray-400 mb-2">First Name</label>
              <input 
                type="text"
                placeholder="Theresa"
                className={`w-full ${inputBgClass} ${inputBorderClass} rounded-lg p-3 ${inputTextClass}`}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-400 mb-2">Last Name</label>
              <input 
                type="text"
                placeholder="Webb"
                className={`w-full ${inputBgClass} ${inputBorderClass} rounded-lg p-3 ${inputTextClass}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input 
                type="email"
                placeholder="demo@mail.com"
                className={`w-full ${inputBgClass} ${inputBorderClass} rounded-lg p-3 ${inputTextClass}`}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-400 mb-2">Mobile</label>
              <input 
                type="tel"
                placeholder="(270) 555-5555"
                className={`w-full ${inputBgClass} ${inputBorderClass} rounded-lg p-3 ${inputTextClass}`}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea 
              rows="6"
              placeholder="Type your message here..."
              className={`w-full ${inputBgClass} ${inputBorderClass} rounded-lg p-3 ${inputTextClass}`}
            ></textarea>
          </div>

          {/* Send Message Button */}
          <div className="pt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsDrawer;
