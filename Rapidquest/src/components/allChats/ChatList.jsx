import React, { useState } from "react";
import "./ChatList.css";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const ChatList = ({ chats, onSelectChat }) => {
  const [search, setSearch] = useState("");

  const filteredChats = Object.keys(chats).filter((wa_id) =>
    chats[wa_id].name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chatlist-wrapper">
      {/* Top Bar */}
      <div className="chatlist-header">
        <h2 className="whatsapp-logo">WhatsApp</h2>
        <div className="chatlist-icons">
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>

      {/* Search Input */}
      <div className="chatlist-search">
        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="chatlist-tabs">
        <span className="tab">All Chats</span>
        <span className="tab">Unread</span>
        <span className="tab">Favourites</span>
        <span className="tab">Groups</span>
      </div>

      {/* Chat Items */}
      <div className="chatlist-container">
        {filteredChats.map((wa_id) => (
          <div
            key={wa_id}
            className="chatlist-item"
            onClick={() => onSelectChat(wa_id)}
          >
            <div className="chatlist-avatar">
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </div>
            <div className="chatlist-content">
  <div className="chatlist-name">{chats[wa_id].name}</div>
  <div className="chatlist-last">
    {chats[wa_id].messages.at(-1)?.text || "No messages yet"}
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
