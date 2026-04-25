import { getRefreshTokenFromRedis } from "../../../core/redis.client.js";
import jwt from "jsonwebtoken"

export async function refreshTokenService(refreshToken) {
  const storedUserId = await getRefreshTokenFromRedis(refreshToken);

  // 1. guarding our protected routes against unregistered users
  if (!storedUserId) {
    console.error({
      message: "no token available at refresh-roken (redis)",
      location: "auth/refreshTokenController",
      error: "no token available at refresh-roken (redis)",
    });
    
      return {
      status: 401,
      error: {
        message: "invalid Refresh token",
      },
    };
  }

  //2. sign new access token
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
