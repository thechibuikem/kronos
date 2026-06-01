import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function unflaggedAgent(metrics) {
  let uniqueFiles = metrics.filesChanged
  uniqueFiles = [...uniqueFiles]
  const prompt = `You are a developer productivity coach. Summarize this developer's 6-hour session in 1-2 sentences. Neutral tone.

  <STATS>
    - Added: ${metrics.totalAdds} lines
    - Deleted: ${metrics.totalDeletes} lines
    - Files changed: ${uniqueFiles.join(", ")} 
    - Commits: ${metrics.messages.join(", ")}
  </STATS>

  <TIP_REQUIREMENTS>
    -Just factual summary. No coaching, no judgment.
  </TIP_REQUIREMENTS>

    <OUTPUT_FORMAT>
      Strictly return ONLY a valid JSON object in this exact format with no additional text:
      {
          "summary": "summary here",
      }
    </OUTPUT_FORMAT>
      `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
}
