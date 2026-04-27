import { redisClient } from "../../../core/redis.client.js";


// we use our refresh token stored in an http-only cookie as a key in redis, so here we're gonna clear the session token from redis
export async function logOutService(refreshToken) {

try{
 await redisClient.del(refreshToken);
}
catch(error){
      console.error({
      message: "Logout service failed to delete refresh token",
      location: "auth/logOutService",
      error: error.message,
    });

    throw error;
  }

}
