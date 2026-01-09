import { addOauthUser } from "../utils/addOauthUser.js";

//url to get github code
export function githubOauthService() {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.PROJECT_BASE_URL}/api/auth/github/callback&scope=user:email,repo`; 
}

//callback function to get github token using code 
export async function githubTokenService(code) {
  const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  }); //using code to get github access-token


  if (!tokenRes.ok) throw new Error("GitHub token request failed");//if something is wrong with our request to get an access token

  // retrieving access_token from github
  const { access_token } = await tokenRes.json();


  // Fetch user profile
  const user = await (
    await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` }
    })
  ).json(); //get user details from github

  const emails = await (
    await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
  ).json();



  // getting our users email to store in on gitHub
  const primary = emails.find((e) => e.primary && e.verified && e.email);
  if (!primary) throw new Error("No verified email");

  const email = primary.email;

  const {status,data,exitingOauthUser} = await addOauthUser(
    email,
    user,
    access_token
  );

  const redirectUrl = `http://localhost:5173/dashboard` 

  return { redirectUrl,data,status};
}
