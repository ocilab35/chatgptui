import React, { useState } from "react";
import {
  MessageSquare,
  Image,
  HelpCircle,
  FileText,
  ChevronDown,
  Smartphone,
  Award,
  Edit2,
  Trash2,
} from "lucide-react";

const Sidebar = ({
  darkMode,
  sidebarCollapsed,
  setSidebarCollapsed,
  showMore,
  setShowMore,
  onNewChat,
  chats,
  onSelectChat,
  activeChatId,
  onEditChatTitle,
  onDeleteChat,
}) => {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleNewChat = () => {
    if (onNewChat) onNewChat();
  };

  const startEditing = (chat) => {
    setEditingChatId(chat._id);
    setEditTitle(chat.title);
  };

  const saveEdit = (chatId) => {
    if (editTitle.trim()) {
      onEditChatTitle(chatId, editTitle);
    }
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e, chatId) => {
    if (e.key === "Enter") {
      saveEdit(chatId);
    } else if (e.key === "Escape") {
      setEditingChatId(null);
      setEditTitle("");
    }
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-white"} ${
        sidebarCollapsed ? "w-16" : "w-52"
      } flex flex-col border-r ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } transition-all duration-300`}
    >
      <div className="p-3 flex items-center">
        <div className="bg-blue-600 text-white p-1.5 rounded-full mr-2">
          <MessageSquare size={16} />
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold text-base">BotAI</span>
        )}
      </div>

      <div className="px-2 py-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 w-full flex items-center justify-center"
          onClick={handleNewChat}
        >
          {sidebarCollapsed ? (
            <MessageSquare size={16} />
          ) : (
            <>
              <MessageSquare size={16} className="mr-2" />
              <span className="text-sm">New Chat</span>
            </>
          )}
        </button>
      </div>

      <div className={`px-2 py-1 ${sidebarCollapsed ? "items-center" : ""}`}>
        <div
          className={`flex items-center p-1.5 rounded-lg ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } cursor-pointer`}
        >
          <Image
            size={16}
            className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          {!sidebarCollapsed && <span className="text-sm">AI Generator</span>}
        </div>
        <div
          className={`flex items-center p-1.5 rounded-lg ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } cursor-pointer`}
        >
          <HelpCircle
            size={16}
            className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          {!sidebarCollapsed && <span className="text-sm">Explore BotAI</span>}
        </div>
      </div>

      {!sidebarCollapsed && (
        <>
          <div className="mt-2 px-2">
            <div
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } mb-1`}
            >
              Chats
            </div>
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex items-center p-1.5 rounded-lg group ${
                  activeChatId === chat._id
                    ? darkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                } cursor-pointer relative`}
              >
                {editingChatId === chat._id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, chat._id)}
                    onBlur={() => saveEdit(chat._id)}
                    className={`flex-1 text-xs p-1 rounded ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black"
                    }`}
                    autoFocus
                  />
                ) : (
                  <>
                    <FileText
                      size={14}
                      className={`mr-1.5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <span
                      className="text-xs truncate flex-1"
                      onClick={() => onSelectChat(chat._id)}
                    >
                      {chat.title}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                      <button
                        onClick={() => startEditing(chat)}
                        className={`p-1 rounded-full ${
                          darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                        }`}
                      >
                        <Edit2
                          size={12}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                      </button>
                      <button
                        onClick={() => onDeleteChat(chat._id)}
                        className={`p-1 rounded-full ${
                          darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                        }`}
                      >
                        <Trash2
                          size={12}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 px-2">
            <div
              className={`flex items-center p-1.5 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } cursor-pointer`}
              onClick={() => setShowMore(!showMore)}
            >
              <ChevronDown
                size={14}
                className={`mr-1.5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } ${showMore ? "transform rotate-180" : ""}`}
              />
              <span className="text-xs">More</span>
            </div>
            {showMore && (
              <div className="ml-4 mt-1">
                <div
                  className={`flex items-center p-1.5 rounded-lg ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } cursor-pointer`}
                >
                  <FileText
                    size={14}
                    className={`mr-1.5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs truncate">Additional item 1</span>
                </div>
                <div
                  className={`flex items-center p-1.5 rounded-lg ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } cursor-pointer`}
                >
                  <FileText
                    size={14}
                    className={`mr-1.5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs truncate">Additional item 2</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-auto">
        <div className="px-2 py-1">
          <div
            className={`flex items-center p-1.5 rounded-lg ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } cursor-pointer`}
          >
            <HelpCircle
              size={16}
              className={`mr-1.5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            {!sidebarCollapsed && <span className="text-sm">Support</span>}
          </div>
          <div
            className={`flex items-center p-1.5 rounded-lg ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } cursor-pointer`}
          >
            <MessageSquare
              size={16}
              className={`mr-1.5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            {!sidebarCollapsed && <span className="text-sm">Custom Bots</span>}
          </div>
          <div
            className={`flex items-center p-1.5 rounded-lg ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } cursor-pointer`}
          >
            <Award
              size={16}
              className={`mr-1.5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            {!sidebarCollapsed && <span className="text-sm">Settings</span>}
          </div>
        </div>

        <div
          className={`px-2 py-2 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg p-1.5 w-full flex items-center justify-center">
            {sidebarCollapsed ? (
              <Smartphone size={16} />
            ) : (
              <>
                <Smartphone size={16} className="mr-1.5" />
                <span className="text-xs">Get App</span>
                <span className="ml-auto text-xs bg-blue-100 px-1 py-0.5 rounded text-xs">
                  New
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
