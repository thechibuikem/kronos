import { userModel } from "../models/userModel.js"

export async function getMDBUserThroughRefreshToken(refreshToken) {
    const user = await userModel.findOne({refreshToken})
// guard incase there's no user
if (!user){
 return console.log("user is not found at WatchList service 46")
}

return user
//
}