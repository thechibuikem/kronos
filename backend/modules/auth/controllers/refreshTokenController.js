import { refreshTokenService } from "../services/refreshTokenService.js";

export async function checkToken(req,res) {
  try{
    // 1. extract refersh token from request cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken || typeof refreshToken !== "string") return res.status(401).json(
    { error: {message: "No refresh token in cookies",
      code:"INVALID_TOKEN"
    } });


  // refresh token service
  const result = await refreshTokenService(refreshToken);

const responseBody = {}
// preparing my response body
if (result.data.accessToken){
  responseBody.accessToken = result.data.accessToken
}

  if (result.status === 200) {
     res.status(result.status).json({data:responseBody});

  } else if (result.status === 401) {
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