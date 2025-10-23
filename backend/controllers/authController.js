import dotenv from "dotenv";
import { userModel } from "../models/userModel.js";
import { genHashPassword } from "../features/bcryptHashing.js";
import jwt from "jsonwebtoken";
dotenv.config(); // making all environmental variables accessible
export let token; //variable to hold JWT token

// function that runs when signing up a user
export async function signupUser(req, res) {
  const { email, password } = req.body;
  const hashpassword = await genHashPassword(password); //hash the password using bcrypt

  try {
    const existingUser = await userModel.findOne({ userEmail: email });// first scan through users collection to ensure user doesn't exist to avoid duplicates
    if (!existingUser) {//add a new user if this user doesn't already exist
      const newUser = new userModel({
        userEmail: email,
        userPassword: hashpassword,
      });
      await newUser.save();      // save newUser to userModel collection
      console.log("saved new user successfully");
      // after user has been saved to database, create a jwt token for the user for session management
      token = jwt.sign({ verified: true }, process.env.jwtSecretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "user created successfully", token: token });//send token to the front-end
      return;
    }
    // if user already exists alert us
    else {
      console.log("duplicate user entry detected");
      res.json({
        error:
          "cannot create a new user as user with this email already exists",
        oldEmail: true,
      });
    }
  } catch (err) {
    res.json({ "unexpected error detected ": err });
  }
}
