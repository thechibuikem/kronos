import { getRefreshTokenFromRedis } from "../../../core/redis.client.js";
import jwt from "jsonwebtoken"

export async function refreshTokenService(refreshToken) {
  const storedUserId = await getRefreshTokenFromRedis(refreshToken);//checking if user is still logged in.

  // 1. guarding our protected routes against unregistered users
  if (!storedUserId) {
    console.log("no token available at refresh-roken (redis)");
    return {
      status: 401,
      error: {
        message: "invalid Refresh token",
      },
    };
  }


  //2. sign new access token and send to client for authentication
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
