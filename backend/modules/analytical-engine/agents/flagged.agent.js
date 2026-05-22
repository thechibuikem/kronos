import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function geminiAnalyze(commits, flags) {
  const flagSummary = flags
    .map((f) => `[${f.severity.toUpperCase()}] ${f.pattern}: ${f.reason}`)
    .join("\n");

  const prompt = `You are a developer productivity coach. Analyze this 6-hour coding session.

Detected patterns (severity flagged):
${flagSummary}

Commit messages:
${commits.map((c) => `- ${c.message}`).join("\n")}

Your job: 
1. Explain the core pattern you see
2. Give ONE actionable suggestion to improve next time
Keep it 2-3 sentences, direct.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}
