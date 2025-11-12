import { userModel } from "../../user/models/userModel.js";
import { genHashPassword,checkUser } from "../utils/bcryptHashing.js";
import { checkPassword } from "../utils/passwordChecker.js";
import jwt from "jsonwebtoken"
let secretKey = process.env.JWT_SECRET_KEY

// sign up user service
export async function signUpService(email,password){
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

    await newUser.save(); //save

    const accessToken = jwt.sign(
      { userId: newUser["_id"], roles: newUser["roles"] },
      secretKey,
      { expiresIn: "15m" }
    ); //access-token

    const refreshToken = jwt.sign({ userId: newUser["_id"] }, secretKey, {
      expiresIn: "10d",
    }); //refresh Token

    // Store refresh token in DB
    newUser.refreshTokens.push(refreshToken);
    await newUser.save();

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
  console.error("Login Service Error:", error);

  // Return a generic, non-descriptive error to the client for security
  return {
    status: 500,
    data: { error: "Internal server error" },
  };}
}

//log in user service
export async function logInService(email,password){

try{

 const existingUser = await userModel.findOne({ userEmail: email }); // finds user

  // if email doesn't match any existing user
  if (!existingUser) {
    return {
      status: 404,
      data: { error: "Invalid login credentials"},
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

    await existingUser.save();//saving changes made to an existing users failed attempt counter

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
    secretKey,
    { expiresIn: "15m" }
  ); //access-token
 
  //long term token
  const refreshToken = jwt.sign({ userId: existingUser["_id"] }, secretKey, {
    expiresIn: "10d",
  }); //refresh Token

  existingUser.failedAttempts = 0;
  existingUser.lockUntil = null;
  existingUser.refreshTokens.push(refreshToken);
  await existingUser.save();

  return {
    status: 200,
    data: {
      message: "User logged in successfully",
      accessToken: `${accessToken}`,
      refreshToken: `${refreshToken}`,
    },
  };
}
catch(error){
// Log the error for internal debugging
        console.error("Login Service Error:", error); 
        
        // Return a generic, non-descriptive error to the client for security
        return {
            status: 500,
            data: { error: "Internal server error" },
        };
}
}


 

