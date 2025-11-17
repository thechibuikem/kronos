import { userModel } from "../../user/models/userModel.js";
import { redisClient } from "../../../core/redisClient.js";
import jwt from "jsonwebtoken";

export const addOauthUser = async (email, user) => {
  try {
    //first find a user added through github in the database
    const exitingOauthUser = await userModel.findOne({
      $or: [{ userEmail: email }, { github_id: user.id }],
    });

    if (!exitingOauthUser) {
      //add a new user if this user doesn't already exist
      const newUser = userModel({
        userEmail: email,
        githubId: user.id,
        repos_url: user.repos_url,
        avatar_url: user.avatar_url,
        username: user.login,
      });

      //add new user to collection

      // creating refresh and access token for authorization

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

      await newUser.save(); // save newUser to userModel collection
      console.log("saved new user successfully");

    return {
      status: 200,
      data: {
        message: "User created successfully",
        accessToken: `${accessToken}`,
        refreshToken: `${refreshToken}`,
      },
    }}

    //if user was already existing sign make changes to the mmongo document
    if (exitingOauthUser) {
      exitingOauthUser.githubId = user.id;
      (exitingOauthUser.repos_url = user.repos_url),
        (exitingOauthUser.avatar_url = user.avatar_url),
        (exitingOauthUser.username = user.login);

      // creating refresh and access token for authorization

      const accessToken = jwt.sign(
        { userId: exitingOauthUser["_id"], roles: exitingOauthUser["roles"] },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      ); //access-token

      const refreshToken = jwt.sign(
        { userId: exitingOauthUser["_id"] },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        })

            // Store refresh token in redis, we are using refreshToken as the key because redis doesn't allow us retrieve by value and for our cookie refresh_token, we can only identify by value
    redisClient.set(refreshToken,`refresh:${exitingOauthUser["_id"]}`, {
      EX: 60 * 60 * 24 * 30,
    });

    await exitingOauthUser.save();

    console.log("Backend says user logged in successfully");

    return {
      exitingOauthUser,
      status: 200,
      data: {
        message: "User logged in successfully",
        accessToken: `${accessToken}`,
        refreshToken: `${refreshToken}`,
      },
    }; //refresh Token
    }
  } 
  catch (err) {
    console.log("unexprected error occured in addAuthUser function", err);
  }
};
