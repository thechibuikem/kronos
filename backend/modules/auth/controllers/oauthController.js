// controllers/oauth.controller.js
import {
  githubOauthService,
  githubTokenService,
} from "../services/oauthService.js";

const isProduction = process.env.MODE === "remote"


//1. controller to get temporary github code
export async function githubOauth(req, res) {
  try {
    const url = githubOauthService();//url to get github temporary code
    return res.redirect(url); 
  } catch (error) {
    console.error("OAuth Init error:", error);
    
    return res.status(500).json({ error:  {
    "message":"oAuth initialization failed",
    "code":"OAUTH_INIT_FAILED"
  } });
  }
}

//2. controller to get githubToken from code.
export async function githubCallback(req, res) {
  const code = req.query.code;

if (!code){
   return res.status(400).json({
     error: {
       message: "OAuth authentication failed",
       code: "OAUTH_FLOW_FAILED",
     },
   });
}


  try {
  
    const result = await githubTokenService(code);

  if (result.status === 200){
  res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "None",
      path:"/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  // const responseBody = {}

  // //update responseBody if there's an access token in response
  // if (result.data.acccessToken){
  //   responseBody.acccessToken = result.data.acccessToken
  // }
    return res.status(result.status).redirect(result.redirectUrl);
  } 
  catch (error) {
    console.error("Oauth Error:",error);
        return res.status(500).json({
          error: {
            message: "OAUTH FAILED",
            code: "OAUTH_FAILED",
          },
        });
  }
}
