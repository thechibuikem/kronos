import dotenv from 'dotenv'
dotenv.config()
import { addOauthUser } from '../features/addOauthUser.js'

export async function githubOauth(req,res){
//  knock at authorization server

console.log("shii is starting at least from githubOauth function")
// url I'm getting code from
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:5000/api/auth/github/callback&scope=user:email`
    //scope there tells github I'm requesting for basic profile and email
    res.redirect(githubAuthUrl)
}
  //after we have our code this function is to get token
  export async function gitHubToken (req,res){
  const code = req.query.code//The code github returns
  console.log("code",code)
  // getting  token from github
  try{
      const tokenRes = await fetch(
        `https://github.com/login/oauth/access_token`,
        {
          method: "POST",
          headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
          })
        }
      )

  //checking if the tokenResponse from github is okay
  if(!tokenRes.ok){
    return console.error("token response is not okay",tokenRes.statusText)
  }

  const data = await tokenRes.json()
  const accessToken = data.access_token//token from github

  console.log("token gotten from github in exchange for code",accessToken)


  //getting user using token
  const userRes = await fetch('https://api.github.com/user',{
      method: "GET",
      headers:{Authorization: `Bearer ${accessToken}`}
  })

  const user = await userRes.json()

  console.log({"user":user})

  const emailRes = await fetch('https://api.github.com/user/emails',{
      headers:{Authorization: `Bearer ${accessToken}`}
  })

  const emails = await emailRes.json()

  console.log("email res",emails)

  // find the array containing the primary email address
  const requiredEmail = await emails.find((email)=>(email.primary == true)&& (email.email !== null)&&(email.verified == true))

  const primaryEmail = requiredEmail.email

  // if this user doesn't have any primary email set
  if (!primaryEmail) return (console.error("no primary email detected"))

  const {exitingOauthUser,token} = await addOauthUser(primaryEmail,user)
  const {newUser,newToken} = await addOauthUser(primaryEmail,user)
  if(exitingOauthUser){
    console.log("existing user",exitingOauthUser,token)
      res.redirect(`http://localhost:5173?token=${token}`);
  }else if(newUser){
      res.redirect(`http://localhost:5173?token=${newToken}`);
    console.log("new user",newUser,newToken)
  }
  return
  }

  catch(err){
      console.error("unexpected error occurred",err);
        return res.redirect('http://localhost:5173')
  }
  }//ending of getToken function
