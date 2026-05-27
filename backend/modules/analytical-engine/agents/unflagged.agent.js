import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function unflaggedAgent(metrics) {
  const prompt = `You are a developer productivity coach. Summarize this developer's 6-hour session in 1-2 sentences. Neutral tone.

Stats:
- Added: ${metrics.totalAdds} lines
- Deleted: ${metrics.totalDeletes} lines
- Files changed: ${metrics.filesChanged.join(", ")}
- Commits: ${metrics.messages.join(", ")}

Just factual summary. No coaching, no judgment.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}
