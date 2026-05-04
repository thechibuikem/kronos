import { analysisQueue,redisClient } from "../../../core/queue/analysis.queue.js";
// const { analyzeWithGemini } = require("../services/analyticalEngine");
import { redisClient } from "../../../core/redis.client.js";

analysisQueue.process(async (job) => {
  const { userID, commits } = job.data;

  // Send to Gemini
  // const insights = await analyzeWithGemini(commits);

  // Persist insights to MongoDB
  // await saveInsights(userID, insights);

  // Clear Redis list
 const deleted = await redisClient.del(`kron:${userID}:commits`);

 if (deleted) {
   console.log("Commits cleared");
 } else {
   console.log("Nothing to delete");
 }

return

  // return { success: true, userID, insightCount: insights.length };
});

analysisQueue.on("completed", (job) => {
  console.log(`✓ Analysis completed for user ${job.data.userID}`);
});

analysisQueue.on("failed", (job, err) => {
  console.error(`✗ Analysis failed for user ${job.data.userID}:`, err.message);
});


