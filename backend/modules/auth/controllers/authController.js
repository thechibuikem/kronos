import { signUpService,logInService } from "../services/auth.service";

export async function signupUser (req,res){
const {email,password}= req.body

const result = await signUpService(email,password)//response from signup service

return res.status(result.status).json(result.data)

}

export async function logInUser(req,res) {
    const {email,password}= req.body

const result = await logInService(email,password)//response from login service

return res.status(result.status).json(result.data)

}