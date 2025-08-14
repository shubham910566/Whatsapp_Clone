import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Message } from "./models/Message.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kesib27679:N7qUiLjWtDrg9sqe@whatsapp.a1jzgjn.mongodb.net/')
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Get all chats
app.get("/api/chats", async (req, res) => {
  const messages = await Message.find();
  const grouped = {};

  messages.forEach((msg) => {
    if (!grouped[msg.wa_id]) {
      grouped[msg.wa_id] = {
        name: msg.name,
        wa_id: msg.wa_id,
        messages: []
      };
    }

    grouped[msg.wa_id].messages.push({
      text: msg.text,
      fromMe: msg.from !== msg.wa_id,
      timestamp: msg.timestamp,
      status: msg.status
    });
  });

  res.json(grouped);
});

// Save message
app.post("/api/send", async (req, res) => {
  const { wa_id, name, text } = req.body;

  const newMessage = new Message({
    wa_id,
    name,
    from: process.env.OWN_NUMBER,
    to: wa_id,
    text,
    timestamp: new Date().toISOString(),
    status: "sent",
    msg_id: "demo-" + Date.now()
  });

  await newMessage.save();
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
