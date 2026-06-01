import { GoogleGenAI } from "@google/genai";
import { SEVERITY } from "../services/analyse-batch.service.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function flaggedAgent(metrics, flags) {
  const { messages } = metrics;

  const flagSummary = flags
    .map((flag) => {
      const key = Object.keys(SEVERITY).find(
        (key) => flags[key] === flag.severity,
      );

      return `[${key}] ${flag.pattern}: ${flag.reason}`;
    })
    .join("\n");

  const prompt = ` You are a developer productivity coach. Analyze this 6-hour coding session

    <DEVELOPER_DATA>
      Detected patterns (severity flagged):
      Commit messages:
      ${messages.map((message) => `- ${message}`).join("\n")}
      ${flagSummary}

    </DEVELOPER_DATA>

    <MISSION>
      1. Explain the core pattern you see
      2. Give ONE actionable suggestion to improve next time
      Keep it 1-2 sentences, direct.;
    </MISSION>

    <TIP_REQUIREMENTS>
      - Length: Each Explanation must be 8-20 words maximum
      - Length: Each Tip must be 8-30 words maximum
      - Relevance: Tips must directly relate to developer-data
      - Tone: Use friendly, actionable language (e.g., "Try this" not "You must")
      - Impact: Focus on HIGH-IMPACT actions that meaningfully improve productivity
      - Specificity: Avoid generic advice, be developer-data contextual and precise
    </TIP_REQUIREMENTS>

    <OUTPUT_FORMAT>
      Strictly return ONLY a valid JSON object in this exact format with no additional text:
      {
          "explanation": "explanation here",
              "tip":"tip here"
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

  return JSON.parse(response.text)
}


// AI's flagged insight *Pattern:* You fell into a chaotic, trial-and-error debugging loop across 13 files, characterized by massive code churn and repetitive "fixing bug" commits to resolve basic runtime and syntax errors. 

// *Actionable Suggestion:* Next time, run a local linter and write a single, failing integration test before writing code; this will catch undefined variables and async issues instantly, preventing the need for trial-and-error commits.
// it got to the deleting from redis part
