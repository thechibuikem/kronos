import { userModel } from "../models/user.model.js"

export async function getMDBUserThroughRefreshToken(refreshToken) {
const user = await userModel.findOne({refreshToken})
// guard incase there's no user
if (!user){
console.error({
  message: "Failed to fetch user",
  location: "user/user.service.js",
  error: user,
});
throw new Error("Failed to fetch user");
}

return user
}