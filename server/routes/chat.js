import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`You are ServiceMatch Assistant AI. Answer professionally.\n\nUser: ${message}`);
    const response = await result.response.text();

    res.json({ reply: response });
  } catch (err) {
    console.log("Gemini error: ", err);
    res.status(500).json({ reply: "Server error" });
  }
});

export default router;
