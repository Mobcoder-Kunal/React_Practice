-------------------------------------------- NOTES-APP ---------------------------------------------------

Tech Stack : 
Frontend: React + Vite + TypeScript
Backend: Node.js + Express
Database: MongoDB Atlas
Auth: JWT + bcrypt
Styling: Tailwind

Dependencies : --> npm i express mongoose cors dotenv jsonwebtoken bcryptjs

Understand Each Package :
🔹 Express : 👉 Used to create your server easily

Without Express: You’d manually handle HTTP (hard)
With Express: app.get("/route", handler)

🔹 Mongoose : 👉 Helps you interact with MongoDB using JS objects
Instead of raw DB queries: Note.find()

🔹 cors : 👉 Allows frontend (React) to talk to backend
Without it: Browser blocks requests (security policy)

🔹 dotenv : 👉 Lets you store secrets safely
Example: JWT_SECRET=abc123

🔹 jsonwebtoken : 👉 Used to create login tokens
We’ll use it to : generate token on login and verify user identity

🔹 bcryptjs : 👉 Encrypts passwords
Why : Never store plain passwords ❌ Always store hashed passwords ✅

useNavigate (from react-router-dom) : 👉 it allows page navigation without reload