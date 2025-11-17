// controllers/oauth.controller.js
import {
  githubOauthService,
  githubTokenService,
} from "../services/oauthService.js";

//controller using githubOauthService to redirect us to github oauth service and get code
export async function githubOauth(req, res) {
  try {
    const url = githubOauthService();
    return res.redirect(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OAuth init failed" });
  }
}

//where our githubOauth service would land us to, this would use the githubTokenService to get a token.
export async function githubCallback(req, res) {
  const code = req.query.code;
//
  try {
    // const { redirectUrl, status, data } = await githubTokenService(code);
    const result = await githubTokenService(code);

if (result.status == 200){
res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true, // JS cannot access it
      secure: false, // only over HTTPS in production
      sameSite: "Lax",
      path:"/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  const responseBody = {}

  //update responseBody if there's an access token in response
  if (result.data.acccessToken){
    responseBody.acccessToken = result.data.acccessToken
  }

    return res.status(result.status).redirect(result.redirectUrl);
  } catch (err) {
    console.error(err);
    // return res.redirect(process.env.PROJECT_BASE_URL);
    res.send(err)
  }
}
