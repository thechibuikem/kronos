  import {Queue} from 'bullmq'

  export const analysisQueue = new Queue("analysis-queue", {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      username: "default",
    },
  });
