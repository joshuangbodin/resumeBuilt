import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";

const apiKey =  Constants.expoConfig?.extra?.geminiApiKey ??
  process.env.EXPO_GEMINI_API_KEY ?? "";

const ai = new GoogleGenerativeAI(apiKey);

// pick a model
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function aICall(prompt = "") {
    if(!prompt) return "Sorry We couldn't proccess your request at the moment"
    
  const result = await model.generateContent(prompt);
  return result.response.text();
}


