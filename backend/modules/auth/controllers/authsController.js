import dotenv from "dotenv";
import { userModel } from "../../user/userModel.js";
import { genHashPassword, checkUser } from "../utils/bcryptHashing.js";
import jwt from "jsonwebtoken";
dotenv.config(); // making all environmental variables accessible
let secretKey = process.env.JWT_SECRET_KEY
export let token; //variable to hold JWT token

// function that runs when signing up a user
export async function signupUser(req, res) {
  const { email, password } = req.body;
  const hashpassword = await genHashPassword(password); //hash the password using bcrypt

  try {
    const existingUser = await userModel.findOne({ userEmail: email }); // first scan through users collection to ensure user doesn't exist to avoid duplicates
    if (!existingUser) {
      //add a new user if this user doesn't already exist
      const newUser = new userModel({
        userEmail: email,
        userPassword: hashpassword,
      });
      await newUser.save(); // save newUser to userModel collection
      console.log("saved new user successfully");
      // after user has been saved to database, create a jwt token for the user for session management
      token = jwt.sign({ verified: true }, secretKey );
      res.json({ message: "user created successfully", token: token }); //send token to the front-end
      return;
    }
    // if user already exists alert us
    else {
      console.log("duplicate user entry detected");
      res.json({
        error:
          "user already exists",
        relay: true,
      });
    }
  } catch (err) {
    res.json({ "unexpected error detected ": err });
  }
}

// function that runs when logging in an existing user
export async function loginUser(req, res) {
  const { email, password } = req.body;
  let match = false; //boolean fleg that would hold check user output
  try {
    const existingUser = await userModel.findOne({ userEmail: email });

//the real login deal if we can match a user
    if (existingUser) {
      //add a new user if this user doesn't already exist
      let hashPassword = existingUser.userPassword;
      //match try
      try{
        match = await checkUser(password,hashPassword)
        if (!match) {
          res.status(200).json({error:"invalid login credentials",relay:true}); return
        }
        //once a match is found
        token = jwt.sign({verified:true},secretKey,{/*options*/})
        res.status(200).json({message:"user found",token:token})
      }  
      catch(err){
        console.error("unexpected error ocurred in match try block: ",err)
      }
    } else {
      res.json({
        error: "User doesn't exist",
        oldEmail: true, //basically oldEmail here is a flag to display error message
      });
      return
    }}
  
  catch (err) {
    res.json({ "unexpected error detected ": "this error is from the backend " });
  }
}
