import { Queue } from "bullmq";
import { bullmqconnection } from "../redis.client.js";

 

export const analysisQueue = new Queue("analysis-queue", {
  connection: bullmqconnection,
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



