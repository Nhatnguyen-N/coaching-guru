const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!apiKey) throw new Error("Thiếu API Key"); // Kiểm tra key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: "How are you?" }],
    },
  ],
});
