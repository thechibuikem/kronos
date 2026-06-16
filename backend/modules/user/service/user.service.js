import { userModel } from "../models/user.model.js";

export async function getMDBUserThroughRefreshToken(refreshToken) {
  const user = await userModel.findOne({ refreshToken });
  // guard incase there's no user
  if (!user) {
    console.error({
      message: "Failed to fetch user",
      location: "user/user.service.js",
      error: user,
    });
    throw new Error("Failed to fetch user");
  }

  return user;
}

export async function getUserFromUserId(userId) {
  const user = await userModel.findOne({ _id: userId });
  // guard incase there's no user
  if (!user) {
    console.error({
      message: "Failed to fetch user",
      location: "user/user.service.getUserFromUserId.js",
      error: user,
    });
    throw new Error("Failed to fetch user");
  }

  return user;
}

export async function getUserFromGithubId(githubId) {
  const user = await userModel.findOne({ githubId});
  // guard incase there's no user
  if (!user) {
    console.error({
      message: "Failed to fetch user",
      location: "user/user.service.getUserFromUserId.js",
      error: user,
    });
    throw new Error("Failed to fetch user");
  }

  return user;
}