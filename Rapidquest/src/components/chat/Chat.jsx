import React, { useState } from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import "./Chat.css";

const Chat = ({ chat, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-user-info">
          <strong>{chat.name}</strong> ({chat.wa_id})
        </div>
        <div className="chat-header-icons">
          <span title="Video Call" className="icon"><VideoCallIcon/></span>
          <span title="Search" className="icon"><SearchIcon/></span>
          <span title="Options" className="icon">⋮</span>
        </div>
      </div>

      <div className="chat-messages">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.fromMe ? "from-me" : "from-them"}`}
          >
            <div>{msg.text}</div>
            <div className="chat-meta">
              <span>
                {new Date(msg.timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
              {msg.fromMe && (
                <span className="chat-status">{msg.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          value={message}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
