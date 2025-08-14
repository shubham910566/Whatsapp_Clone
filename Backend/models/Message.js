import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  from: String,
  to: String,
  text: String,
  timestamp: String,
  status: {
    type: String,
    default: "sent"
  },
  msg_id: String,
});

export const Message = mongoose.model("Message", MessageSchema);
