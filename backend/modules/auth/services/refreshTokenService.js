import { getRefreshTokenFromRedis } from "../../../core/redisClient.js";
import jwt from "jsonwebtoken"

export async function refreshTokenService(refreshToken) {
  const storedUserId = await getRefreshTokenFromRedis(refreshToken);//checking an exact fron redis that matches the one is cookie, signifying that the one in the cookie isn't expired yet

  if (!storedUserId) {
    console.log("no token available at refresh-roken (redis)");
    return {
      status: 401,
      error: {
        message: "invalid Refresh token",
      },
    };
  }


  // sign new access token and send it to front-end
  const accessToken = jwt.sign({ userId: storedUserId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15mins",
  }); //refresh Token

  return {
    status: 200,
    data: {
      message: "User Logged in successfully",
      accessToken: `${accessToken}`,
    },
  };
}
