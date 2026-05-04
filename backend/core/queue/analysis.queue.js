import pkg from "bull"
const {Queue} = pkg


export const analysisQueue = new Queue("analysis-queue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
