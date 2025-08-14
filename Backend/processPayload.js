import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Message } from "./models/Message.js";


dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

// __dirname workaround in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const payloadDir = path.join(__dirname, "payloads");

// Read all files in /payloads
const files = fs.readdirSync(payloadDir);

for (const file of files) {
  const filePath = path.join(payloadDir, file);
  console.log(`📝 Processing file: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    const entry = data.metaData?.entry?.[0];
    if (!entry) {
      console.warn(`⚠️ No entry found in ${file}`);
      continue;
    }

    const change = entry.changes?.[0]?.value;
    if (!change) {
      console.warn(`⚠️ No change object in ${file}`);
      continue;
    }

    // 📩 Incoming message
    if (change.messages) {
      const msg = change.messages[0];
      const contact = change.contacts?.[0];
      if (!msg || !contact) {
        console.warn(`⚠️ Missing message or contact in ${file}`);
        continue;
      }

      const messageDoc = new Message({
        wa_id: contact.wa_id,
        name: contact.profile.name,
        from: msg.from,
        to: process.env.OWN_NUMBER,
        text: msg.text?.body || "",
        timestamp: new Date(parseInt(msg.timestamp) * 1000).toISOString(),
        msg_id: msg.id,
        status: "sent"
      });

      await messageDoc.save();
      console.log(`✅ Saved message from ${contact.wa_id}: "${msg.text?.body}"`);
    }

    // 📦 Status update
    if (change.statuses) {
      const statusUpdate = change.statuses[0];
      try {
        const updated = await Message.findOneAndUpdate(
          { msg_id: statusUpdate.id },
          { status: statusUpdate.status },
          { new: true }
        );

        if (updated) {
          console.log(`✅ Updated status for message ${updated.msg_id} to ${statusUpdate.status}`);
        } else {
          console.warn(`⚠️ Message not found for status update: ${statusUpdate.id}`);
        }
      } catch (err) {
        console.error("❌ Error updating status:", err.message);
      }
    }
  } catch (err) {
    console.error(`❌ Failed to process ${file}:`, err.message);
  }
}

console.log("🎉 All payloads processed!");
process.exit();
