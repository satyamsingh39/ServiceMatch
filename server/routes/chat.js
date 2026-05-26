// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// router.post("/", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(`You are ServiceMatch Assistant AI. Answer professionally.\n\nUser: ${message}`);
//     const response = await result.response.text();

//     res.json({ reply: response });
//   } catch (err) {
//     console.log("Gemini error: ", err);
//     res.status(500).json({ reply: "Server error" });
//   }
// });

// export default router;


import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are ServiceMatch Assistant AI.

ServiceMatch is a platform that connects businesses and job seekers in the hospitality and service industry.

Your role:
- Help users understand the platform
- Help job seekers find suitable jobs
- Help businesses hire staff
- Answer platform-related questions
- Guide users professionally and clearly

Instructions:
- Keep responses natural, short, and helpful
- Be professional but conversational
- Avoid overly corporate or robotic language
- Give relevant and contextual responses
- Ask follow-up questions when needed
- Focus mainly on hospitality, restaurant, hotel, and service-related hiring

User Message:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response.text();

    res.json({ reply: response });
  } catch (err) {
    console.log("Gemini error: ", err);

    res.status(500).json({
      reply: "Something went wrong. Please try again later.",
    });
  }
});

export default router;
