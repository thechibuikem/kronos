import bcrypt from 'bcrypt'
import { model } from 'mongoose';
const saltRounds = 10;

// 
export async function genHashPassword(password) {
    try{
        //generate salt and hash together
        const hash = await bcrypt.hash(password,saltRounds);
        return hash

    }catch(err){
console.log(err)
    }
}

// basically this checkuser function is dependent on the genHashPassword function, it first generates a new hash using password that has been passed in and then compares the results to export a boolean either true or false
export async function checkUser (email, password) {

const foundUser = await model.findOne({userEmail:email})

    const match = bcrypt.compare(password, foundUser.userPassword)

    return match
}