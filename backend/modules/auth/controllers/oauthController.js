// controllers/oauth.controller.js
import {
  githubOauthService,
  githubTokenService,
} from "../services/oauth.service.js";

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
    const { redirectUrl } = await githubTokenService(code);
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    return res.redirect(process.env.PROJECT_BASE_URL);
  }
}
