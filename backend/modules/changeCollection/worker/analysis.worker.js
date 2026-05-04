import { analysisQueue,redisClient } from "../../../core/queue/analysis.queue.js";
// const { analyzeWithGemini } = require("../services/analyticalEngine");
import { Worker } from "bullmq";






export const analysisWorker = new Worker(
  "analysis-queue",
  async (job) => {
    const { userID, commits } = job.data;

    console.log(`Processing batch for ${userID}`);

    // Send to Gemini
    // const insights = await analyzeWithGemini(commits);

    // Persist to MongoDB
    // await saveInsights(userID, insights);

    // Clear Redis
    await redisClient.del(`kron:${userID}:commits`);

    return { success: true };
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      username: "default",
    },
  },
);

analysisWorker.on("completed", (job) => {
  console.log(`✓ Job ${job.id} completed`);
});

analysisWorker.on("failed", (job, err) => {
  console.error(`✗ Job ${job.id} failed:`, err.message);
});



  
  