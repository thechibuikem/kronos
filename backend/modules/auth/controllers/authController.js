// import { error } from "console";
import { signUpService,logInService } from "../services/authService.js";
// import path from "path";

export async function signupUser (req,res){
  const { email, password } = req.body;

  const result = await signUpService(email, password); //response from signup service

  //only return cookies if signUp is successful
  if (result.status == 200)
  {res.cookie("refreshToken", result.data.refreshToken, {
    httpOnly: true, // JS cannot access it
    path: "/",
    secure: false, // only over HTTPS in production
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });}
  
  // Construct the JSON response dynamically based on success/failure
  const responseBody = {
    message: result.data.message,// we expect data.message to always be present
  }
  if (result.data.accessToken){
    responseBody.accessToken = result.data.accessToken
  }

  if (result.data.error){
    responseBody.error = result.data.error
  }

  //return a status code and message
  return res.status(result.status).json(responseBody)
}

export async function logInUser(req,res) {
  const { email, password } = req.body;

  const result = await logInService(email, password); //response from login service

  //only return cookies if login is successful
  if (result.status == 200) {
    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true, // JS cannot access it
      secure: false, // only over HTTPS in production
      sameSite: "Lax",
      path:"/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  // Construct the JSON response dynamically based on success/failure

  const responseBody = {
    message: result.data.message, // we expect data.message to always be present
  };
  if (result.data.accessToken) {
    responseBody.accessToken = result.data.accessToken;
  }

  if (result.data.error) {
    responseBody.error = result.data.error;
  }

  //return a status code and message
  return res.status(result.status).json(responseBody);
}