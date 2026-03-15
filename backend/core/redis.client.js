import { createClient } from "redis";

//1. initialize a redis client instance
export const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// 2. log any errors encountered
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// 3. create async function that connects to redis
async function redisConnect() {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log("error occured while connecting to redis\n", err);
  }
}

// 4. run redis-connecting function
await redisConnect();

// so basically here I am checking if mmy refreshToken entry is still in redus cache because it has a TTL and if it's no longer there it means the one in http cookie is invalid
export async function getRefreshTokenFromRedis(refreshToken) {
  const userId = await redisClient.get(refreshToken); //get the userId from reddis because refreshTokemn is a key
  return userId;
}
