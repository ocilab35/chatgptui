import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`py-2 px-3 text-center text-xs border-t ${
        darkMode
          ? "border-gray-700 text-gray-400"
          : "border-gray-200 text-gray-500"
      } mt-auto`}
    >
      Copyright ©2025 <span className="text-blue-600">BotAI</span>. All Rights
      Reserved
    </footer>
  );
};

export default Footer;
