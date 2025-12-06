//service to get list of repositories from github
import { redisClient } from "../../../core/redisClient.js";
import { userModel } from "../../user/models/userModel.js";

export async function getReposFromGithub(token, etag) {
  let response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
      "If-None-Match": etag || "",
    },
  });

  if (!response.ok) {
    return console.log("repolist http response is flawed");
  }

  const eTag = response.headers.get("etag")//retrieving etag from response
  const repoData = await response.json();
  const repoList = repoData.map((e) => ({
    repoId: e.id,
    repoName: e.name,
    repoUrl: e.html_url,
    isPrivate: e.private,
  }));
  return {repoList,eTag};
}

// store repos in redis
export async function storeReposInRedis(userId,repos){
    const key =`user:${userId}:repos`;
    await redisClient.set(key, JSON.stringify(repos));
}

// store in redis
export async function storeInRedis(key, value) {

  await redisClient.set(key, JSON.stringify(value));
}

// get repos from redis
export async function getReposFromRedis(refreshToken) {
//first github
const user = userModel.findOne({refreshToken:refreshToken})

if (!user){
 return console.log("user is not found at WatchList service 46")
}
const key = `user:${user.githubId}:repos `

const data = await redisClient.get(key);
return data ? JSON.parse(data) : [];
}

