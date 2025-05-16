import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Chat from "./Chat";
import SettingsDrawer from "./SettingsDrawer";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [newChatTrigger, setNewChatTrigger] = useState(0);
  const [error, setError] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  useEffect(() => {
    const initializeChats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to use the chat");
          return;
        }

        const response = await fetch("http://localhost:5000/api/chats/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch chats");
        const data = await response.json();

        if (data.length > 0) {
          setChats(data);
          setActiveChatId(data[0]._id);
        } else {
          await createNewChat(token);
        }
      } catch (error) {
        console.error("Error initializing chats:", error);
        setError("Failed to load chats. Please try again.");
      }
    };

    initializeChats();
  }, []);

  const createNewChat = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/chats/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (!response.ok) throw new Error("Failed to create chat");
      const newChat = await response.json();
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat._id);
      setNewChatTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating chat:", error);
      setError("Failed to create a new chat.");
    }
  };

  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to create a new chat");
        return;
      }
      setError(null);
      await createNewChat(token);
    } catch (error) {
      console.error("Error in handleNewChat:", error);
      setError("Failed to create a new chat.");
    }
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setNewChatTrigger((prev) => prev + 1);
    setError(null);
  };

  const handleEditChatTitle = async (chatId, newTitle) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `http://localhost:5000/api/chats/${chatId}/title`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (!response.ok) throw new Error("Failed to update title");
      const updatedChat = await response.json();
      setChats((prev) =>
        prev.map((chat) => (chat._id === chatId ? updatedChat : chat))
      );
    } catch (error) {
      console.error("Error updating title:", error);
      setError("Failed to update chat title.");
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `http://localhost:5000/api/chats/${chatId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete chat");
      setChats((prev) => prev.filter((chat) => chat._id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(chats.length > 1 ? chats[0]._id : null);
        setNewChatTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      setError("Failed to delete chat.");
    }
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
          chats={chats}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
          onEditChatTitle={handleEditChatTitle}
          onDeleteChat={handleDeleteChat}
        />
        <Chat
          darkMode={darkMode}
          newChatTrigger={newChatTrigger}
          activeChatId={activeChatId}
          setChats={setChats}
          error={error}
        />
      </div>
    </div>
  );
};

export default Navbar;
