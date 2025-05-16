import React from 'react';
import './ScrollbarStyles.css'; // Import your existing scrollbar styles

const PrivacyPolicyDrawer = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-gray-700 bg-opacity-30'} flex items-center justify-center z-50`}>
      <div className={`w-full max-w-[600px] rounded-lg overflow-y-auto p-6 max-h-[90vh] shadow-xl chat-scrollbar ${darkMode ? 'bg-[#282a36] text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-normal">Privacy Policy</h2>
          <button onClick={onClose} className="text-3xl">&times;</button>
        </div>
        
        <div className="space-y-6">
          {/* Privacy Policy content goes here */}
          <div className="pb-6 mb-6 border-b border-gray-700">
            <h3 className="text-xl mb-2">Your Privacy Matters</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              We are committed to protecting your personal information and your right to privacy.
            </p>
          </div>
          
          <div className="pb-6 mb-6 border-b border-gray-700">
            <h3 className="text-xl mb-2">Information We Collect</h3>
            <p className="text-gray-400">
              We collect personal information that you voluntarily provide to us when you register, 
              express an interest in obtaining information about us or our products and services, or otherwise contact us.
            </p>
          </div>
          
          <div className="pb-6 mb-6 border-b border-gray-700">
            <h3 className="text-xl mb-2">How We Use Your Data</h3>
            <p className="text-gray-400">
              We use personal information collected via our platform for a variety of business purposes 
              described below. We process your personal information for these purposes in reliance on our 
              legitimate business interests, in order to enter into or perform a contract with you, with 
              your consent, and/or for compliance with our legal obligations.
            </p>
          </div>
          
          <div className="pb-6 mb-6 border-b border-gray-700">
            <h3 className="text-xl mb-2">Cookie Policy</h3>
            <p className="text-gray-400">
              We use cookies and similar tracking technologies to track the activity on our service and 
              store certain information. Cookies are files with a small amount of data which may include 
              an anonymous unique identifier.
            </p>
          </div>
          
          <div className="pb-6">
            <h3 className="text-xl mb-2">Contact Us</h3>
            <p className="text-gray-400">
              If you have questions or comments about this privacy policy, you may email us at 
              privacy@company.com or contact us through the contact form on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyDrawer;