import { GoogleGenAI } from "@google/genai";
import { SEVERITY } from "../services/analyse-batch.service.js";



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function flaggedAgent(metrics, flags) {
  const {
    messages,
  } = metrics;

  const flagSummary = flags
    .map(
      (flag) =>{

        const key = Object.keys(SEVERITY).find(key=>flags[key]=== flag.severity)
        
       return `[${key}] ${flag.pattern}: ${flag.reason}` }
    )
    .join("\n");




const prompt = `You are a developer productivity coach. Analyze this 6-hour coding session.

Detected patterns (severity flagged):
${flagSummary}

Commit messages:
${messages.map((message) => `- ${message}`).join("\n")}

Your job: 
1. Explain the core pattern you see
2. Give ONE actionable suggestion to improve next time
Keep it 1-2 sentences, direct.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text;
}
