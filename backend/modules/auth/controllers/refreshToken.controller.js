import { refreshTokenService } from "../services/refreshToken.service.js";

export async function generateAccessToken(req,res) {
  try{
    // 1. extract refersh token from request cookies
  const refreshToken = req.cookies.refreshToken;
  // refresh token service
const result = await refreshTokenService(refreshToken);
  if (result.data) {
     res.status(200).json({data:{
      accessToken:result.data.accessToken}
    });

  } else if (result.error) {
    return res.status(401).json({
      error:{
      message:result.error.message,
      code:"TOKEN_GENERATION_FAILED"
    }
    });
  }

    }
    catch(error){
      console.error("Oauth Error:",error);
        return res.status(500).json({
          error: {
            message: "refresh token failed",
            code: "REFRESH_TOKEN_FAILED",
          }
    });
}}