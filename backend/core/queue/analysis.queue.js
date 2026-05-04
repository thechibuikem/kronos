import {Queue} from 'bullmq'

export const analysisQueue = new Queue("analysis-queue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
