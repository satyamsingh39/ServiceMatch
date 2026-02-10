import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoute from "./routes/chat.js";
import authRoutes from "./routes/auth.routes.js";
import waiterRoutes from "./routes/waiter.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/waiter", waiterRoutes);
app.use("/api/hotel", hotelRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 ServiceMatch API is live and running successfully!");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
