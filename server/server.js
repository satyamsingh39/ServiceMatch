// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// connectDB();

// app.get("/", (req, res) => {
//   res.send("✅ MongoDB connected successfully!");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// import dotenv from "dotenv";
// dotenv.config();

// console.log("RESEND KEY:", process.env.RESEND_API_KEY);
// console.log("EMAIL:", process.env.EMAIL_USER, "PASS:", process.env.EMAIL_PASS);

// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import chatRoute from "./routes/chat.js";

// // Connect DB
// connectDB();

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST"],
//   credentials: true
// }));

// // Chat route (Gemini)
// app.use("/chat", chatRoute);

// // Other API routes
// app.use("/api/users", userRoutes);

// // Basic test route
// app.get("/", (req, res) => {
//   res.send("✅ ServiceMatch API is running successfully...");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// server/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoute from "./routes/chat.js";

// ✅ Check environment variables
console.log("✅ ENV CHECK → PORT:", process.env.PORT || 5000);
console.log("✅ Firebase Admin Key (if configured):", process.env.FIREBASE_PROJECT_ID || "Not loaded");

// ✅ Connect MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (Allow both local dev ports or any from .env)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite frontend
      "http://localhost:8080", // React dev or Firebase emulator
      process.env.CLIENT_URL,  // Optional: production frontend
    ].filter(Boolean), // remove undefined
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/chat", chatRoute);        // Gemini Chatbot route
app.use("/api/users", userRoutes);  // User routes (Firebase + MongoDB)

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 ServiceMatch API is live and running successfully!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
