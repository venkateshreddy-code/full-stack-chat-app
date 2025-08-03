Got it! Here’s your updated README with the app name **ChatHari**:

---

# 💬 ChatHari | MERN Real-Time Chat Application

🚀 **Live Demo:** [https://full-stack-chat-app-3tnq.onrender.com/profile](https://full-stack-chat-app-3tnq.onrender.com/profile)
💻 **GitHub Repo:** [https://github.com/venkateshreddy-code/full-stack-chat-app](https://github.com/venkateshreddy-code/full-stack-chat-app)

---

## 📋 Project Overview

**ChatHari** is a full-stack real-time chat app built with the **MERN stack** and **Socket.IO**. It offers instant messaging, theme customization, profile picture upload, and an intuitive, responsive UI.

---

## ✨ Key Features

* 💬 Real-time one-on-one chat (Socket.IO)
* 🔐 JWT Authentication (Login/Signup)
* 🎨 35+ UI themes with DaisyUI
* 👤 Profile picture upload
* 🌓 Light/dark mode toggle
* 🧠 Zustand for state management
* 📱 Responsive design (mobile & desktop)
* ⚙️ Settings page for user preferences
* 🚀 Deployed on Render

---

## 🚀 Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Frontend | React, Tailwind CSS, DaisyUI, Zustand |
| Backend  | Node.js, Express, Socket.IO           |
| Database | MongoDB (Mongoose)                    |
| Auth     | JSON Web Tokens (JWT)                 |
| Deploy   | Render                                |

---

## 📷 Screenshots

### 🔐 Login Page

![Login](https://res.cloudinary.com/dh9gs449u/image/upload/v1754236362/Screenshot_2025-08-03_at_11.51.20_AM_jhzw5u.png)

---

### 💬 Chat Container

![Chat Container](https://res.cloudinary.com/dh9gs449u/image/upload/v1754236685/Screenshot_2025-08-03_at_11.55.02_AM_wztudj.png)

---

### 📲 Chat Demo

![Chat Demo](https://res.cloudinary.com/dh9gs449u/image/upload/v1754237481/Screenshot_2025-08-03_at_12.10.43_PM_ehqbpu.png)

---

### ⚙️ Settings Page

![Settings](https://res.cloudinary.com/dh9gs449u/image/upload/v1754237635/Screenshot_2025-08-03_at_12.12.45_PM_osfdom.png)

---

### 👤 Profile Page

![Profile](https://res.cloudinary.com/dh9gs449u/image/upload/v1754237702/Screenshot_2025-08-03_at_12.14.33_PM_smwr4o.png)

---

## 🏁 Getting Started Locally

1. **Clone the repository**

```bash
git clone https://github.com/venkateshreddy-code/full-stack-chat-app.git
cd full-stack-chat-app
```

2. **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Set environment variables** (in `/backend/.env`)

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

4. **Run the app**

```bash
# Backend server
cd backend
npm start

# Frontend server (new terminal)
cd ../frontend
npm run dev
```

---

## 🔌 API & Socket Events

| Type   | Endpoint / Event  | Description                   |
| ------ | ----------------- | ----------------------------- |
| REST   | `/api/auth`       | Login & Registration          |
| REST   | `/api/messages`   | Send & fetch chat messages    |
| Socket | `join-room`       | User joins chat room          |
| Socket | `send-message`    | Emit new message in real time |
| Socket | `receive-message` | Listen for incoming messages  |

---

## 💡 Future Enhancements

* Group chats & channels
* Message read receipts & typing indicators
* Push notifications
* Voice/video chat integration
* Friends list and contacts management

---

## 🤝 Contributing

Feel free to fork, open issues, or submit pull requests to improve the app.

---

## 💌 Contact

Made with ❤️ by [Venkatesh Reddy Ningam](https://github.com/venkateshreddy-code)

---

