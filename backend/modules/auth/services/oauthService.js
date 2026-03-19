import { addOauthUser } from "../utils/addOauthUser.js";
import { getUrls } from "../../../core/config.js"

// 0. destructuring backend url from getUrls getter function.
const {backendUrl}= getUrls()


//1. Initial service to knock at github's door.
export function githubOauthService() {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${backendUrl}/api/auth/github/callback&scope=user:email,repo`; 
}

//2. callback function to get github token using code
export async function githubTokenService(code) {
  // .1 post request submitting code to get token response
  const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  // .2 validating token response
  if (!tokenRes.ok) throw new Error("GitHub token request failed");

  //.3 retrieving access token from token response
  const { access_token } = await tokenRes.json();

console.log("\naccess Token @ oauthService",access_token,"\n" )

  //.4 Fetching user profile
  const userRes= await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  })  
  const user = await userRes.json();

  console.log(user)

  //.5 Fetching user emails
  const emailRes= await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
  })
  const emails = await (emailRes).json();
  const primary = emails.find((e) => e.primary && e.verified && e.email);
  
  //  .6 validating & retrieving emails
  if (!primary) throw new Error("No verified email");
  const email = primary.email;


 // .7 signing up or signing in 
  const { status, data } = await addOauthUser(
    email,
    user,
    access_token,
  );

  // front-end redirect uri
  const redirectUrl = `http://localhost:5173/dashboard`;

  return { redirectUrl, data, status };
}
