import { Queue } from "bullmq";
import { getBullMQConnection } from "../redis.client.js";

let analysisQueue;

export function initializeAnalysisQueue() {
  analysisQueue = new Queue("analysis-queue", {
    connection: getBullMQConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });
  console.log("Analysis Queue Initialized Successfully 🌟");
  return analysisQueue;
}

export function getAnalysisQueue() {
  return analysisQueue;
}