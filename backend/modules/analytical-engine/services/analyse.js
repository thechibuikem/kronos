import { getMetrics, heuristicEngine } from "./analyse-batch.service.js";

export function analyze(commits){
const metrics = getMetrics(commits)
const heuristics = heuristicEngine(metrics)

if (heuristic.isFlagged) {
  // send to Gemini for analysis
  const insight = await geminiAnalyze(commits, heuristic.flags);
} else {
  // send template email
  const insight = generateTemplate(metrics);
}


}



