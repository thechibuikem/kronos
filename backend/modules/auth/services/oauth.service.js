import { addOauthUser } from "../utils/addOauthUser.js";
import { getUrls } from "../../../core/config.js"

// 0. destructuring backend url from getUrls getter function.
const {frontendUrl,backendUrl}= getUrls()


//1. Initial service to knock at github's door.
export function githubOauthService() {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${backendUrl}/api/v1/auth/github/callback&scope=user:email,repo`; 
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
  if (!tokenRes.ok){
    const responseText = await tokenRes.text();
    console.error({
        message: "Github Token Request Failed",
        location: "auth/oauthService",
        error: responseText,
      });
    throw new Error("Github Token Request Failed");
    } 
      

  //.3 retrieving access token from token response
  const { access_token } = await tokenRes.json();


  //.4 Fetching user profile
  const userRes= await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  })  

if (!userRes.ok) {
  const body = await userRes.text();

  console.error({
    message: "GitHub user fetch failed",
    status: userRes.status,
    error: body,
  });

  throw new Error(
    "Failed to fetch user profile"
  );
}

const user = await userRes.json();

if (!user || typeof user !== "object" || !user.id) {
  throw new Error(
    "Invalid user data from provider"
  );
}



  //.5 Fetching user emails
const emailRes= await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
  })

if (!emailRes.ok) {
  const body = await emailRes.text();

  console.error({
    message: "GitHub email fetch failed",
    status: emailRes.status,
    error: body,
  });

  throw new Error(
    "Failed to fetch user emails",
  );
}

const emails = await emailRes.json();

if (!Array.isArray(emails)) {
  throw new Error(
    "Invalid email response format",
  );
}

  const primary = emails.find(
    (e) => e.primary && 
    e.verified && 
    e.email &&
    typeof e.email === "string"
  );
  
  // 
if (!primary) {
  console.error({
    message: "No verified primary email found",
    location: "auth/oauthService",
    emailsCount: Array.isArray(emails) ? emails.length : null,
  });

  throw new Error(
    "No verified primary email found",
  );
}


  const email = primary.email;


 // .7 signing up or signing in 
  const { status, data } = await addOauthUser(
    email,
    user,
    access_token,
  );

  // front-end redirect uri
const redirectUrl = `${frontendUrl}/dashboard?token=${data.accessToken}`;

  return { redirectUrl, data, status };
}
