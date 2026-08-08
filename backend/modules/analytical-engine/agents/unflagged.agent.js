import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function unflaggedAgent(kronName, metrics) {
  let uniqueFiles = metrics.filesChanged
  uniqueFiles = [...uniqueFiles]
  const prompt = `You are a developer productivity coach. Summarize this developer's 6-hour session in 1-2 sentences. Neutral tone.

  <STATS>
    - Repository Name : ${kronName}
    - Added: ${metrics.totalAdds} lines
    - Deleted: ${metrics.totalDeletes} lines
    - Files changed: ${uniqueFiles.join(", ")} 
    - Commits: ${metrics.messages.join(", ")}
  </STATS>

  <SUMMARY_REQUIREMENTS>
    -Just factual summary. No coaching, no judgment.
    - Tone: Use friendly, conversational language
    - Specificity: Avoid generic summary, be STATS contextual and precise
  </SUMMARY_REQUIREMENTS>

    <OUTPUT_FORMAT>
      Strictly return ONLY a valid JSON object in this exact format with no additional text:
      {
          "summary": "summary here",
      }
    </OUTPUT_FORMAT>
      `;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

console.log("response @ flagged agent", response);
console.log("text response @ flagged agent", response.text);

const insights = JSON.parse(response.text);


if (!insights){
    console.error({
      message: `insights is undefined`,
      location: "analytical-engine/agents/unflagged.agent.js",
      error: insights,
    });
}


console.log("insights at unflagged agent",insights)


return insights;
}
