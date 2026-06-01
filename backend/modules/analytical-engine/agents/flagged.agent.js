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

// const prompt = f` You are a developer productivity coach. Analyze this 6-hour coding session

//   <DEVELOPER_DATA>
//     Detected patterns (severity flagged):

//     Commit messages:
//     ${messages.map((message) => `- ${message}`).join("\n")}
//     ${flagSummary}

//   </DEVELOPER_DATA>

//   <MISSION>
//     1. Explain the core pattern you see
//     2. Give ONE actionable suggestion to improve next time
//     Keep it 1-2 sentences, direct.;
//   </MISSION>

//   <FOCUS_AREAS>
//     1. Energy consumption - heating, cooling, electricity usage
//     2. Transportation emissions - walking, biking, driving alternatives
//     3. Carbon-smart daily choices - water use, food, waste reduction
//     4. Weather-specific climate actions - leveraging natural conditions
//   </FOCUS_AREAS>

//   <TIP_REQUIREMENTS>
//     - Length: Each Explanation must be 8-30 words maximum
//     - Length: Each Tip must be 8-30 words maximum
//     - Relevance: Tips must directly relate to developer-data
//     - Tone: Use friendly, actionable language (e.g., "Try this" not "You must")
//     - Impact: Focus on HIGH-IMPACT actions that meaningfully improve productivity
//     - Specificity: Avoid generic advice, be developer-data contextual and precise
//   </TIP_REQUIREMENTS>

//   <OUTPUT_FORMAT>
//     Return ONLY a valid JSON object in this exact format with no additional text:
//     {{
//         "explanation": 
//             "explanation here",
//             "tip":"tip here"
//     }}
//   </OUTPUT_FORMAT>
//         `;
