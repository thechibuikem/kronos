import { userModel } from "../../user/userModel";
import { genHashPassword,checkUser } from "../utils/bcryptHashing";
import jwt from "jsonwebtoken"
import { Verified } from "lucide-react";
let secretKey = process.env.JWT_SECRET_KEY

// sign up user service
export async function signUpService(email,password){
    const existingUser = await userModel.findOne({ userEmail: email }); // catch duplicates
    if (existingUser){
        return{
            status:400,
            data:{error:"user already exists",relay:true} //flag for front-end
        }
    }
    //if we pass our guard
  const hashpassword = await genHashPassword(password); //hash using bcrypt
     
    const newUser = new userModel({
    userEmail: email,
    userPassword: hashpassword,
  });

  await newUser.save();//save our new user

  const token = jwt.sign({ verified: true }, secretKey);//access-token

  return {
    status: 200,
    data: { message: "User created successfully", token },
  };
}

export async function logInService(email,password){
    const existingUser = await userModel.findOne({ userEmail: email }); // catch duplicates
    
       if (!existingUser){
        return{
            status:400,
            data:{error:"user doesn't exist",oldEmail:true} //flag for front-end
        }
    }

//if we pass our existing-user guard
const match = await checkUser(password,existingUser.userPassword)

if (!match){
    return{
        status:400,
        data:{
            error:"Invalid login credentials",
            relay:true
        }
    }
}

//if we pass our match-password guard
const token = jwt.sign({verified:true},secretKey)//access-token

return{
    status:200,
    data:{
        message:"user found",
        token:token
    }
}

}


