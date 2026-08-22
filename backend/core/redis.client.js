import { createClient } from "redis";
import {createNodeRedisClient } from "bullmq";

// 1. initialize a redis client instance
export const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

export function getBullMQConnection() {
  return createNodeRedisClient(redisClient);
}

export async function initializeBullMQ() {
  await connectRedis(); // Make sure Redis is connected first
  return createNodeRedisClient(redisClient);
}

// 2. log any errors encountered
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// 3. create async function that connects to redis
export async function connectRedis() {
  if (redisClient.isOpen) {
    console.log(redisClient)
    console.log("redisClient.isOpen:", redisClient.isOpen);
    console.log("redisClient.isReady:", redisClient.isReady);
    console.log("redisClient.status:", redisClient.status);
    console.log("a redis client is aready open")
    console.log(new Error().stack);
    return; // already connected, skip

} 
  try {
    await redisClient.connect();
    console.log("Connected to redis 🌟");
  } catch (err) {
    console.log("error connecting to redis 💣\n", err);
  }
}

// 4. retrieving a userId value from redis
export async function getRefreshTokenFromRedis(refreshToken) {
  const userId = await redisClient.get(refreshToken); //get the userId from reddis because refreshToken is a key
  return userId;
}
