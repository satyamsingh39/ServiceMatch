import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoute from "./routes/chat.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import userRoutes from "./routes/userRoutes.js";

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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/chat", chatRoute);        // Gemini Chatbot route
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 ServiceMatch API is live and running successfully!");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
