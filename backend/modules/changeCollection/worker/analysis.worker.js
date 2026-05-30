import { Worker } from "bullmq";
import { analysisQueue } from "../../../core/queue/analysis.queue.js";
import { redisClient } from "../../../core/redis.client.js";
import { analyze } from "../../analytical-engine/services/analyse.js";

export const analysisWorker = new Worker(
  "analysis-queue",
  async (job) => {
    console.log("job data\n", job.data);

    let { userId, commits } = job.data;
    console.log(`Processing batch for ${userId}`);

    // Send to Gemini
    const insights = await analyze(commits);

    // Persist to MongoDB

    // Clear Redis
    await redisClient.del(`kron:${userId}:commits`);

    console.log("it got to the deleting from redis part")
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

analysisWorker.on("failed", (job, error) => {
  console.error({
    message: `✗ Job ${job.id} failed:`,
    location: "change-collection/analysis.worker.js",
    error: error.message,
  });
});

analysisWorker.on("error", (error) => {
     console.error({
       message:"worker error",
       location: "change-collection/analysis.worker.js",
       error: error.message,
     });
});
  
  