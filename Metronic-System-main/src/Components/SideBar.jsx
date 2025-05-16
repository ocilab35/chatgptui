import React, { useState } from "react";
import './sidebar_css.css';

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
    const activeChat = chats.find((chat) => chat._id === activeChatId);

    // Case 1: No active chat selected (first load) — allow new chat
    if (!activeChatId || !activeChat) {
      if (onNewChat) onNewChat();
      return;
    }

    // Case 2: If the active chat has no messages — don't allow new tab
    const hasMessages = Array.isArray(activeChat.messages) && activeChat.messages.length > 0;
    if (!hasMessages) {
      // Don't open new tab
      return;
    }

    // Case 3: If active chat has messages — allow new chat
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
      className={`${darkMode ? "bg-gray-800" : "bg-white"} ${sidebarCollapsed ? "w-16" : "w-52"
        } flex flex-col border-r ${darkMode ? "border-gray-700" : "border-gray-200"
        } transition-all duration-300 h-full`}
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
          className={`flex items-center p-1.5 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } cursor-pointer`}
        >
          <Image
            size={16}
            className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          />
          {!sidebarCollapsed && <span className="text-sm">AI Generator</span>}
        </div>
        <div
          className={`flex items-center p-1.5 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
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
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="px-2 pt-2 pb-1 sticky top-0 bg-inherit z-10">
            <div
              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Chats
            </div>
          </div>

          <div className="px-2 overflow-y-auto  flex-1 chat-scrollbar">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex items-center p-1.5 rounded-lg group ${activeChatId === chat._id
                  ? darkMode
                    ? "bg-gray-700"
                    : "bg-gray-100"
                  : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                  } cursor-pointer relative mb-1`}
              >
                {editingChatId === chat._id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, chat._id)}
                    onBlur={() => saveEdit(chat._id)}
                    className={`flex-1 text-xs p-1 rounded ${darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black"
                      }`}
                    autoFocus
                  />
                ) : (
                  <>
                    <FileText
                      size={14}
                      className={`mr-1.5 ${darkMode ? "text-gray-400" : "text-gray-500"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat);
                        }}
                        className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat._id);
                        }}
                        className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
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
        </div>
      )}

      <div className={`px-2 py-2 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg p-1.5 w-full flex items-center justify-center">
          {sidebarCollapsed ? (
            <Smartphone size={16} />
          ) : (
            <>
              <Smartphone size={16} className="mr-1.5" />
              <span className="text-xs">Get App</span>
              <span className="ml-auto text-xs bg-blue-100 px-1 py-0.5 rounded">
                New
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;