import {Queue} from 'bullmq'

export const analysisQueue = new Queue("analysis-queue", {
  connection: process.env.REDIS_URL,
});
