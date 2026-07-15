// access_token means github access token while accessToken is jwt's access token
import { redisClient } from "../../../core/redis.client.js";
import jwt from "jsonwebtoken";
import { userModel } from "../../user/models/user.model.js";
import { getUserFromGithubId } from "../../user/service/user.service.js";


export const addOauthUser = async (email, user,access_token) => {
  try {
    const existingOauthUser = await getUserFromGithubId(user.id); //find oauth user.

    //1. user DNE
    if (!existingOauthUser) {
      //.1 create user instance
      const newUser = userModel({
        userEmail: email,
        githubId: user.id,
        repos_url: user.repos_url,
        avatar_url: user.avatar_url,
        username: user.login,
        githubToken:access_token
      });

      //.2 create tokens
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

      //.3 assigning refreshToken to new user
      newUser.refreshToken = refreshToken;
      await newUser.save();

      // .retrieve new user's objectId 


      //.4 storing refresh token in redis 'w' TTL
    console.log("refreshToken\n @ add new user", typeof refreshToken);
    console.log("newUserId\n @ add new user", typeof newUser["_id"]);
      try{
      redisClient.set(`refresh:${refreshToken}`, newUser["_id"].toString(), {
        EX: 60 * 60 * 24 * 30,
      }); 
      }catch(error){
        console.log("\nerror saving refreshToken to redis @addNewUser process",error)
      }
      

      //6, saving new user to DB
      await newUser.save();
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
    //2. user Exists
    if (existingOauthUser) {
      //.1 create tokens
      const accessToken = jwt.sign(
        { userId: existingOauthUser["_id"], roles: existingOauthUser["roles"] },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );

      const refreshToken = jwt.sign(
        { userId: existingOauthUser["_id"] },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        },
      );

    //.3 updating our saved user
    existingOauthUser.githubId = user.id;
    existingOauthUser.repos_url = user.repos_url,
    existingOauthUser.refreshToken = refreshToken;
    existingOauthUser.githubToken = access_token;

    if (existingOauthUser.userEmail!== email){
      existingOauthUser.userEmail = email
      } 

      // .3 Store refresh token in redis
      // console.log("refreshToken\n @ add existing user", typeof refreshToken);
      // console.log("newUserId\n @ add existing user", typeof existingOauthUser["_id"]);

      try {
        // Before generating new tokens for existing user:
        if (existingOauthUser.refreshToken) {
          await redisClient.del(`refresh:${existingOauthUser.refreshToken}`);
        }
        redisClient.set(`refresh:${refreshToken}`, existingOauthUser["_id"].toString(), {
          EX: 60 * 60 * 24 * 30,
        });
      } catch (error) {
        console.log(
          "\nerror saving refreshToken to redis @addNewUser process",
          error,
        );
      }

      //6, saving exosting user to DB
      await existingOauthUser.save();
      return {
        existingOauthUser,
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
