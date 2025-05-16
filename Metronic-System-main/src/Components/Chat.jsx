import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Lightbulb,
  Mic,
  PenLine,
  Send,
  Image as ImageIcon,
  Video,
  Music,
  Edit,
  BookOpen,
  FileCode,
  FileText,
  Check,
  CheckCheck,
  ThumbsUp,
  ThumbsDown,
  Copy,
  CornerUpRight,
} from "lucide-react";

const Chat = ({ darkMode, newChatTrigger, activeChatId, setChats, error }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [copyNotification, setCopyNotification] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeChatId) {
      const fetchChat = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const response = await fetch(
            `http://localhost:5000/api/chats/${activeChatId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch chat");
          const chat = await response.json();
          setMessages(
            chat.messages.map((msg) => ({
              id: msg._id,
              text: msg.text,
              sender: msg.sender,
              time: new Date(msg.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              images: msg.images || [],
              likes: msg.likes || 0,
              dislikes: msg.dislikes || 0,
            }))
          );
          setShowWelcome(chat.messages.length === 0);
        } catch (error) {
          console.error("Error fetching chat:", error);
        }
      };

      fetchChat();
    } else {
      setMessages([]);
      setShowWelcome(true);
    }
  }, [activeChatId, newChatTrigger]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [newChatTrigger, activeChatId]);

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      const newImages = imageFiles.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file),
      }));

      setUploadedImages((prev) => [...prev, ...newImages]);

      if (inputValue.trim() === "") {
        setInputValue("Check out these images:");
      }
    }
  };

  const generateTitle = (text) => {
    const words = text.trim().split(/\s+/);
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text.substring(0, 30) || "New Chat";
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" && uploadedImages.length === 0) return;
    if (!activeChatId) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      images: uploadedImages.map((img) => img.url),
      likes: 0,
      dislikes: 0,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setUploadedImages([]);
    setShowWelcome(false);

    const newTitle = generateTitle(inputValue);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const messageResponse = await fetch(
        `http://localhost:5000/api/chats/${activeChatId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputValue,
            sender: "user",
            images: uploadedImages.map((img) => img.url),
          }),
        }
      );

      if (!messageResponse.ok) throw new Error("Failed to send message");

      if (messages.length === 0) {
        const titleResponse = await fetch(
          `http://localhost:5000/api/chats/${activeChatId}/title`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
          }
        );

        if (!titleResponse.ok) throw new Error("Failed to update title");

        const updatedChat = await titleResponse.json();
        setChats((prev) =>
          prev.map((chat) => (chat._id === activeChatId ? updatedChat : chat))
        );
      }

      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          text:
            uploadedImages.length > 0
              ? "Thanks for sharing these images! How can I assist you with them?"
              : "Thank you for your message! This is a static reply for now.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          likes: 0,
          dislikes: 0,
        };

        setMessages((prevMessages) => [...prevMessages, botReply]);

        fetch(`http://localhost:5000/api/chats/${activeChatId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: botReply.text,
            sender: "bot",
            images: [],
          }),
        }).catch((error) => console.error("Error saving bot reply:", error));
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyNotification(id);
        setTimeout(() => {
          setCopyNotification(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const replyToMessage = (text) => {
    setInputValue(`"${text}" `);
    inputRef.current?.focus();
  };

  const handleReaction = (messageId, reaction) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          if (reaction === "like") {
            return { ...msg, likes: (msg.likes || 0) + 1 };
          } else if (reaction === "dislike") {
            return { ...msg, dislikes: (msg.dislikes || 0) + 1 };
          }
        }
        return msg;
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main
      className={`flex-1 overflow-hidden p-3 flex flex-col ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {error && (
        <div
          className={`mb-4 p-2 rounded-lg ${
            darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800"
          }`}
        >
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
        {showWelcome ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-3">
                <MessageSquare size={20} />
              </div>
              <h1 className="text-xl font-bold mb-1">Hello, I'm BotAI</h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                How can I make things easier for you?
              </p>
            </div>

            <div className="w-full max-w-xl mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { icon: ImageIcon, text: "Image Generator" },
                { icon: Video, text: "Video Generator" },
                { icon: Music, text: "Audio Generator" },
                { icon: Edit, text: "Photo Editor" },
                { icon: BookOpen, text: "Education Feedback" },
                { icon: MessageSquare, text: "Get Advice" },
                { icon: FileCode, text: "Code Generator" },
                { icon: PenLine, text: "Help me write" },
                { icon: FileText, text: "Summarize text" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 rounded-lg border cursor-pointer hover:shadow-sm ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    size={16}
                    className={`mr-1.5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-xs ${darkMode ? "text-gray-300" : ""}`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-3 pt-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative group">
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      msg.sender === "user"
                        ? `${
                            darkMode ? "bg-blue-600" : "bg-blue-500"
                          } text-white`
                        : darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>

                    {msg.images && msg.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {msg.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="Uploaded content"
                              className="rounded-md object-cover w-full h-24"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span
                        className={`text-xs ${
                          msg.sender === "user"
                            ? "text-blue-100"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </span>
                      {msg.sender === "user" && (
                        <span>
                          {messages.length > messages.indexOf(msg) + 1 ? (
                            <CheckCheck size={12} className="text-blue-100" />
                          ) : (
                            <Check size={12} className="text-blue-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`absolute ${
                      msg.sender === "user"
                        ? "right-full mr-2"
                        : "left-full ml-2"
                    } 
                    top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1`}
                  >
                    <button
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      className={`p-1 rounded-full ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      title="Copy message"
                    >
                      {copyNotification === msg.id ? (
                        <Check
                          size={14}
                          className={
                            darkMode ? "text-green-400" : "text-green-600"
                          }
                        />
                      ) : (
                        <Copy
                          size={14}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }
                        />
                      )}
                    </button>

                    <button
                      onClick={() => replyToMessage(msg.text)}
                      className={`p-1 rounded-full ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      title="Reply"
                    >
                      <CornerUpRight
                        size={14}
                        className={darkMode ? "text-gray-400" : "text-gray-600"}
                      />
                    </button>

                    {msg.sender === "bot" && (
                      <>
                        <button
                          onClick={() => handleReaction(msg.id, "like")}
                          className={`p-1 rounded-full ${
                            darkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          title="Like"
                        >
                          <ThumbsUp
                            size={14}
                            className={
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }
                          />
                          {msg.likes > 0 && (
                            <span
                              className={`absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full h-4 w-4 flex items-center justify-center`}
                            >
                              {msg.likes}
                            </span>
                          )}
                        </button>

                        <button
                          onClick={() => handleReaction(msg.id, "dislike")}
                          className={`p-1 rounded-full ${
                            darkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          title="Dislike"
                        >
                          <ThumbsDown
                            size={14}
                            className={
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }
                          />
                          {msg.dislikes > 0 && (
                            <span
                              className={`absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center`}
                            >
                              {msg.dislikes}
                            </span>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.url}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md"
              />
              <button
                onClick={() => {
                  setUploadedImages(
                    uploadedImages.filter((img) => img.id !== image.id)
                  );
                  URL.revokeObjectURL(image.url);
                }}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
 {/* input  */}
<div className="w-full flex justify-center">
  <div className={`max-w-[700px] w-full relative rounded-lg shadow-sm border ${
    darkMode 
      ? "border-gray-600 bg-gray-800" 
      : "border-gray-300 bg-white"
  }`}>
    <textarea
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ask anything"
      className={`w-full bg-transparent ${
        darkMode ? "text-gray-200 placeholder-gray-400" : "text-gray-800"
      } px-4 py-3 resize-none focus:outline-none min-h-[52px] max-h-40`}
      style={{
        height: inputValue.length > 100 ? `${Math.min(inputRef.current?.scrollHeight || 52, 160)}px` : '52px',
      }}
    />
     
    <div className={`border-t ${
      darkMode ? "border-gray-700" : "border-gray-200"
    } p-2 flex items-center justify-between`}>
      <div className="flex">
        <button
          onClick={() => fileInputRef.current.click()}
          className={`p-1.5 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
          title="Upload image"
          disabled={!activeChatId}
        >
          <ImageIcon size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
        </button>
      </div>

      <div className="flex">
        <button
          onClick={handleVoiceInput}
          className={`p-1.5 rounded-full ${
            isListening 
              ? "bg-red-500 text-white" 
              : darkMode 
                ? "hover:bg-gray-700" 
                : "hover:bg-gray-100"
          }`}
          title={isListening ? "Stop listening" : "Voice input"}
          disabled={!activeChatId}
        >
          <Mic
            size={16}
            className={isListening ? "text-white" : darkMode ? "text-gray-400" : "text-gray-500"}
          />
        </button>

        <button
          className={`ml-2 p-1.5 rounded-full ${
            inputValue.trim() === "" && uploadedImages.length === 0
              ? darkMode
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleSendMessage}
          disabled={
            (inputValue.trim() === "" && uploadedImages.length === 0) ||
            !activeChatId
          }
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  </div>
</div>
    </main>
  );
};

export default Chat;
