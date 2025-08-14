import React, { useState, useEffect } from "react";
import ChatList from "./components/allChats/ChatList";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/SideBar";
import "./App.css";

function App() {
  const [chats, setChats] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch chats from backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chats");
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Send message
  const handleSendMessage = async (text) => {
    if (!selectedChat || !text.trim()) return;

    const wa_id = selectedChat;
    const name = chats[wa_id]?.name;

    try {
      await fetch("http://localhost:5000/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wa_id, name, text })
      });

      const newMessage = {
        text,
        timestamp: new Date().toISOString(),
        fromMe: true,
        status: "sent"
      };

      // Safely update nested chat message array
      setChats((prevChats) => {
        const updatedChats = { ...prevChats };
        const chatMessages = [...(updatedChats[wa_id].messages || [])];
        chatMessages.push(newMessage);
        updatedChats[wa_id] = { ...updatedChats[wa_id], messages: chatMessages };
        return updatedChats;
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-body">
        <ChatList chats={chats} onSelectChat={setSelectedChat} />
        {selectedChat && chats[selectedChat] && (
          <Chat chat={chats[selectedChat]} onSend={handleSendMessage} />
        )}
      </div>
    </div>
  );
}

export default App;
