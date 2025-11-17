import { userModel } from "../../user/models/userModel.js";
import { genHashPassword,checkUser } from "../utils/bcryptHashing.js";
import { checkPassword } from "../utils/passwordChecker.js";
import { redisClient } from "../../../core/redisClient.js";
import jwt from "jsonwebtoken"

// sign up user service
export async function signUpService(email,password){
  
  // email = email.toLowerCase.trim()//norminalizing email
  try {
    const isPasswordValid = checkPassword(password); //check if password is invalid and alert user

    if (!isPasswordValid) {
      return {
        status: 400,
        data: {
          error:
            "password must contain at least one special character and no whitespace",
        },
      };
    }

    const existingUser = await userModel.findOne({ userEmail: email }); // catch duplicates
    if (existingUser) {
      return {
        status: 400,
        data: { error: "user already exists" }, //flag for front-end
      };
    }
    //if we pass our guard
    const hashpassword = await genHashPassword(password); //hash using bcrypt
    const newUser = new userModel({
      userEmail: email,
      userPassword: hashpassword,
    });


    const accessToken = jwt.sign(
      { userId: newUser["_id"], roles: newUser["roles"] },
       process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    ); //access-token

    const refreshToken = jwt.sign({ userId: newUser["_id"] },  process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: "30d",
    }); //refresh Token

    // Store refresh token in redis, we are using refreshToken as the key because redis doesn't allow us retrieve by value and for our cookie refresh_token, we can only identify by value
    redisClient.set(refreshToken,`refresh:${newUser["_id"]}`, { EX: 60*60*24*30 });
    await newUser.save();

console.log("Backend says user created successfully")

    return {
      status: 200,
      data: {
        message: "User created successfully",
        accessToken: `${accessToken}`,
        refreshToken: `${refreshToken}`,
      },
    };
  } 
  catch (error) {
  // Log the error for internal debugging
  console.error("Signup Service Error:", error);

  // Return a generic, non-descriptive error to the client for security
  return {
    status: 500,
    data: { error: "Internal server error" },
  };}
}

//log in user service
export async function logInService(email,password){
  // email = email.toLowerCase.trim(); //norminalizing email

  try {
    const existingUser = await userModel.findOne({ userEmail: email }); // finds user

    // if email doesn't match any existing user
    if (!existingUser) {
      return {
        status: 404,
        data: { error: "Invalid login credentials" },
      };
    }

    // if my account is locked down
    if (existingUser && existingUser.lockUntil > Date.now()) {
      return {
        status: 400,
        data: {
          error: "account locked temporarily, try again in 30 mminutes",
        }, //flag for front-end
      };
    }

    //if we pass our existing-user guard
    const match = await checkUser(password, existingUser.userPassword);

    //operation on password mismatch
    if (!match) {
      existingUser.failedAttempts++; //increments failed attempts

      // check if exiting user failed attmepys is greater than 5 before locking account
      if (existingUser.failedAttempts > 5) {
        existingUser.lockUntil = Date.now() + 30 * 60 * 1000; // lock for 30 mins
      }

      await existingUser.save(); //saving changes made to an existing users failed attempt counter

      return {
        status: 400,
        data: {
          error: "Invalid login credentials",
        },
      };
    }

    //short term token
    const accessToken = jwt.sign(
      { userId: existingUser["_id"], roles: existingUser["roles"] },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    ); //access-token

    //long term token
    const refreshToken = jwt.sign(
      { userId: existingUser["_id"] },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    ); //refresh Token

    existingUser.failedAttempts = 0;
    existingUser.lockUntil = null;

    // Store refresh token in redis, we are using refreshToken as the key because redis doesn't allow us retrieve by value and for our cookie refresh_token, we can only identify by value
    redisClient.set(refreshToken,`refresh:${existingUser["_id"]}`, {
      EX: 60 * 60 * 24 * 30,
    });

    await existingUser.save();

    console.log("Backend says user logged in successfully");

    return {
      status: 200,
      data: {
        message: "User logged in successfully",
        accessToken: `${accessToken}`,
        refreshToken: `${refreshToken}`,
      },
    };
  } catch (error) {
    // Log the error for internal debugging
    console.error("Login Service Error:", error);

    // Return a generic, non-descriptive error to the client for security
    return {
      status: 500,
      data: { error: "Internal server error" },
    };
  }
}


 

