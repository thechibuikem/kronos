import { getMetrics, heuristicEngine } from "./analyse-batch.service.js";
import { flaggedAgent } from "../agents/flagged.agent.js";
import { unflaggedAgent } from "../agents/unflagged.agent.js";


export async function analyze(commits){
  const metrics = getMetrics(commits)
  const heuristics = heuristicEngine(metrics)

  if (heuristics.isFlagged) {
    // send to Gemini for analysis
    const insights = await flaggedAgent(metrics, heuristics.flags);
    return insights;
    // console.log("AI's flagged insight",insight)
  } else {
    // send template email
    const insights = await unflaggedAgent(metrics);
    return insights;
    // console.log("AI's unflagged insight",insight)

  }
}



