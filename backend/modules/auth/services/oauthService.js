// services/oauth.service.js
import { addOauthUser } from "../utils/addOauthUser.js";

export function githubOauthService() {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.PROJECT_BASE_URL}/api/auth/github/callback&scope=user:email,repo`;
}

//getting token
export async function githubTokenService(code) {
  // Exchange code for token using a POST request, token is response
  const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenRes.ok) throw new Error("GitHub token request failed");

  const { access_token } = await tokenRes.json();

  // Fetch user profile
  const user = await (
    await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` }
    })
  ).json();

  const emails = await (
    await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
  ).json();

  const primary = emails.find((e) => e.primary && e.verified && e.email);
  if (!primary) throw new Error("No verified email");

  const email = primary.email;
// Authorization;Authorization;
// 
  const {status,data,exitingOauthUser} = await addOauthUser(
    email,
    user
  );

  const redirectUrl = `http://localhost:5173/dashboard` 

  return { redirectUrl,data,status};
}
