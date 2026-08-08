import { getMetrics, heuristicEngine } from "./analyse-batch.service.js";
import { flaggedAgent } from "../agents/flagged.agent.js";
import { unflaggedAgent } from "../agents/unflagged.agent.js";


export async function analyze(kronName, commits){
  const metrics = getMetrics(commits)
  const heuristics = heuristicEngine(metrics)

  if (heuristics.isFlagged) {
    // send to Gemini for analysis
    const insights = await flaggedAgent(kronName, metrics, heuristics.flags);

    if (!insights){
        console.error({
          message: `Ai flagged insight generation failed`,
          location: "analytical-engine/services/analyse.js",
          error: insights,
        });
    }

    console.log("AI's flagged insight",insights)
    return insights;
  } else {
    // send template email
    const insights = await unflaggedAgent(kronName, metrics);

       if (!insights) {
         console.error({
           message: `Ai unflagged insight generation failed`,
           location: "analytical-engine/services/analyse.js",
           error: insights,
         });
       }

    console.log("AI's unflagged insight",insights)
    return insights;
  }
}



