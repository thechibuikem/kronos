import { Worker } from "bullmq";
import {
  redisClient,
  getBullMQConnection,
} from "../../../core/redis.client.js";
import { analyze } from "../../analytical-engine/services/analyse.js";
import { sendMail } from "../../notification-system/services/sendmail.service.js";

let analysisWorker;

export function initializeAnalysisWorker() {
  analysisWorker = new Worker(
    "analysis-queue",
    async (job) => {
      console.log("job data\n", job.data);

      let { userId, kronId, kronName, commits } = job.data;
      console.log(`Processing batch for ${userId}`);

      // Send to Gemini
      const insights = await analyze(kronName, commits);

      // send mail
      const mail = await sendMail(userId, insights);
      console.log("mail at analysis-worker", mail);

      // Clear Redis
      await redisClient.del(`kron:${userId}:${kronId}:commits`);
      console.log("it got to the deleting from redis part");
      return { success: true };
    },
    {
      connection: getBullMQConnection(),
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
      message: "worker error",
      location: "change-collection/analysis.worker.js",
      error: error,
    });
  });
  console.log("Analysis Worker Initialized Successfully 🌟");

  return analysisWorker;
}

export function getAnalysisWorker() {
  return analysisWorker;
}