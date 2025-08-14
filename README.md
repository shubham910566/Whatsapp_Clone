# 💬 WhatsApp Web Clone

A **mobile-first**, responsive WhatsApp Web clone built with **React**, **Node.js**, **Express**, and **MongoDB**. Features include chat lists, message sending/receiving, message status tracking, and a WhatsApp-inspired UI.

---

## Features

- Mobile-first responsive design
- Chat list with name and last message
- Send messages to contacts
- Group messages by `wa_id`
- Real-time-like timestamping (simulated payloads)
- Message status tracking (e.g., `sent`)
- Modular React components and Express APIs

---

## Tech Stack

| Frontend      | Backend       | Database |
|---------------|---------------|----------|
| React         | Node.js       | MongoDB  |
| JSX, CSS      | Express.js    | Mongoose |
| Material UI   | dotenv, CORS  |          |

---

## Folder Structure

```
whatsapp-clone/
├── backend/
│   ├── models/Message.js
│   ├── server.js
│   ├── processPayloads.js
│   └── payloads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── allChats/ChatList.jsx
│   │   │   ├── chat/Chat.jsx
│   │   │   └── sidebar/Sidebar.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── public/
├── .env
├── package.json
└── README.md
```

---

## API Endpoints

### `GET /api/chats`
Fetch all chats grouped by `wa_id`. Includes messages, name, and status.

### `POST /api/send`
Send a new message to a contact.

```json
{
    "wa_id": "1234567890",
    "name": "John Doe",
    "text": "Hello!"
}
```

---

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Yarn or npm

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```ini
MONGODB_URI=your_mongo_connection_string
OWN_NUMBER=your_wa_id_number
```

Run the server:

```bash
node server.js
```

(Optional) Process message payloads:

```bash
node processPayloads.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit the app at [http://localhost:3000](http://localhost:3000)

---

## Responsive Design

- Mobile-first using CSS Flexbox and media queries
- Sidebar moves to bottom on small screens
- Text overflow handled with `text-overflow: ellipsis`

---

## Future Enhancements

- Real-time updates using WebSockets
- Dark mode toggle
- Advanced search & filter
- Read receipts and delivery indicators

---

## License

MIT License © 2025
