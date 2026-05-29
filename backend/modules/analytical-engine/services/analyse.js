import { getMetrics, heuristicEngine } from "./analyse-batch.service.js";
import { flaggedAgent } from "../agents/flagged.agent.js";
import { unflaggedAgent } from "../agents/unflagged.agent.js";


export async function analyze(commits){
  const metrics = getMetrics(commits)
  const heuristics = heuristicEngine(metrics)

  if (heuristic.isFlagged) {
    // send to Gemini for analysis
    const insight = await flaggedAgent(metrics, heuristic.flags);
    console.log("AI's flagged insight",insight)
  } else {
    // send template email
    const insight = await unflaggedAgent(metrics);
    console.log("AI's unflagged insight",insight)

  }
}



