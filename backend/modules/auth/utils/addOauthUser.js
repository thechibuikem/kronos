// access_token means github access token while accessToken is jwt's access token
import { userModel } from "../../user/models/userModel.js";
import { redisClient } from "../../../core/redisClient.js";
import jwt from "jsonwebtoken";

export const addOauthUser = async (email, user,access_token) => {
  try {
    const exitingOauthUser = await userModel.findOne({
      $or: [{ userEmail: email }, { github_id: user.id }],
    }); //find oauth user

    // create a new-user
    if (!exitingOauthUser) {
      const newUser = userModel({
        userEmail: email,
        githubId: user.id,
        repos_url: user.repos_url,
        avatar_url: user.avatar_url,
        username: user.login,
        githubToken:access_token
      });

      // create tokens
      const accessToken = jwt.sign(
        { userId: newUser["_id"], roles: newUser["roles"] },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: newUser["_id"] },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      //assigning refreshToken to new user
      newUser.refreshToken = refreshToken;

      // creating refresh and
      redisClient.set(refreshToken, `refresh:${newUser["_id"]}`, {
        EX: 60 * 60 * 24 * 30,
      }); // Store refresh token in redis.

      await newUser.save(); // save newUser
      console.log("saved new user successfully");
      return {
        status: 200,
        data: {
          message: "User created successfully",
          accessToken: `${accessToken}`,
          refreshToken: `${refreshToken}`,
        },
      };
    }

    //if user was already existing sign make changes to the mmongo document
    if (exitingOauthUser) {
      // creating refresh and access token for authorization
      const accessToken = jwt.sign(
        { userId: exitingOauthUser["_id"], roles: exitingOauthUser["roles"] },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { userId: exitingOauthUser["_id"] },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      exitingOauthUser.githubId = user.id;
      (exitingOauthUser.repos_url = user.repos_url),
        // (exitingOauthUser.avatar_url = user.avatar_url),
        // (exitingOauthUser.username = user.login);
      exitingOauthUser.refreshToken = refreshToken;
    exitingOauthUser.githubToken= access_token

      // Store refresh token in redis
      redisClient.set(refreshToken, `refresh:${exitingOauthUser["_id"]}`, {
        EX: 60 * 60 * 24 * 30,
      });

      await exitingOauthUser.save();

      return {
        exitingOauthUser,
        status: 200,
        data: {
          message: "User logged in successfully",
          accessToken: `${accessToken}`,
          refreshToken: `${refreshToken}`,
        },
      };
    }
  } catch (err) {
    console.log("unexprected error occured in addAuthUser function", err);
  }
};
