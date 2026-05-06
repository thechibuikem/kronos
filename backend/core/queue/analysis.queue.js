import { Queue } from "bullmq";

export const analysisQueue = new Queue("analysis-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    username: "default",
  },
  defaultJobOptions: {
    attempts: 3, // Retry 3 times total
    backoff: {
      type: "exponential",
      delay: 2000, // Start at 2s, exponential backoff
    },
    removeOnComplete: true,
    removeOnFail: false, // Delete failed jobs too
  },
});



