import { createClient } from "redis";

export const redisClient = createClient();

// so basically here I am checking if mmy refreshToken entry is still in redus cache because it has a TTL and if it's no longer there it means the one in http cookie is invalid
export async function getRefreshTokenFromRedis(refreshToken){
 const userId = await redisClient.get(refreshToken)//get the userId from reddis because refreshTokemn is a key

 return userId
}
