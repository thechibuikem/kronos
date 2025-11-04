import { userModel } from "../../user/userModel.js";
import jwt from "jsonwebtoken"

export const addOauthUser = async (email,user) =>{

  try{

    //first find a user added through github in the database
const exitingOauthUser = await userModel.findOne({
  $or: [{ userEmail: email }, { github_id: user.id }]
})


    if (!exitingOauthUser) {
      //add a new user if this user doesn't already exist
      const newUser =  userModel({
        userEmail: email,
        github_id: user.id,
        repos_url:user.repos_url,
        avatar_url:user.avatar_url,
        username:user.login
      });

//add new user to collection
      await newUser.save(); // save newUser to userModel collection
      console.log("saved new user successfully");
      let newToken = jwt.sign({ verified: true }, process.env.JWT_SECRET_KEY , {
        // expiresIn: "1h",
      });      // after user has been saved to database, create a jwt token for the user for session management

      return{newUser,newToken}
  }

  //if user was already existing sign jwt
  if(exitingOauthUser){
          let token = jwt.sign({ verified: true }, process.env.JWT_SECRET_KEY  , {
        // expiresIn: "1h",
      });

      return{exitingOauthUser,token}
  }
}
  catch(err){
    console.log("unexprected error occured in addAuthUser function",err)
  }

}
  
  