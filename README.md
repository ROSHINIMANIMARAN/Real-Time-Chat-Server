# 💬 Real-Time Chat Application (Node.js + Express + Socket.IO)

A simple real-time chat server where multiple users can join, send messages, and receive live updates when users join or leave the chat.

This project demonstrates how to build a WebSocket-based chat application using **Node.js**, **Express**, and **Socket.IO**.

---

## 🚀 Features

✅ Real-time messaging (instant message broadcasting)  
✅ Notifies when a user joins or leaves  
✅ Shows list of active users  
✅ Each user gets a unique socket ID  
✅ Lightweight backend with no database (in-memory Map)  
✅ Socket.IO client & server communication demo  
✅ Works across multiple browser tabs / devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Backend | Node.js, Express |
| Realtime Engine | Socket.IO |
| Frontend | HTML, CSS, JavaScript (client served from `/public`) |

---

## 📂 Project Structure


realtime-chat/
│
├── server.js # Main backend server
├── package.json # Dependencies & scripts
├── README.md # Project documentation
│
└── public/ # Frontend client
└── index.html

yaml
Copy code

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repo

```sh
git clone https://github.com/YOUR_USERNAME/realtime-chat.git
cd realtime-chat
2️⃣ Install dependencies
sh
Copy code
npm install
3️⃣ Start the server
sh
Copy code
npm start
or (for auto restart in dev mode):

sh
Copy code
npm run dev
4️⃣ Open in browser
arduino
Copy code
http://localhost:3000
Open multiple tabs to test realtime communication ✅
