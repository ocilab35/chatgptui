import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Chat from "./Chat";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [newChatTrigger, setNewChatTrigger] = useState(0);

  // Handler for new chat button
  const handleNewChat = () => {
    // Increment the trigger to cause Chat component to reset
    setNewChatTrigger((prev) => prev + 1);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          darkMode={darkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          showMore={showMore}
          setShowMore={setShowMore}
          onNewChat={handleNewChat}
        />
        <Chat darkMode={darkMode} newChatTrigger={newChatTrigger} />
      </div>
    </div>
  );
};

export default Navbar;
