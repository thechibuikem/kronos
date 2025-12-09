//service to get list of repositories from github
import { redisClient } from "../../../core/redisClient.js";
import { userModel } from "../../user/models/userModel.js";

export async function getReposFromGithub(githubToken, etag) {
  let response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "If-None-Match": etag || "",
    },
  });

 if (response.status === 304) {
   return response; // No changes
  }

console.log("response: ",response)

  // if (!response.ok) {
  //   return console.log("repolist http response is flawed ");
  // }
  
  return response;
}

// store in redis
export async function storeInRedis(key, value) {
  await redisClient.set(key, JSON.stringify(value));
}

// get repos from redis
export async function getReposFromRedis(user) {
  console.log("githubId: ", user.githubId);
  const key = `user:${user.githubId}:repos`; //key to get repos from redis
  const data = await redisClient.get(key); //redis repos
  return data ? JSON.parse(data) : [];
}

// function to get all Repos
export async function getRepos(user) {
  console.log("user at getRepos",user)
  const githubToken = await user.githubToken
  console.log("githubToken at getRepos :",githubToken)
  const etagKey = `user:${user.id}:etag`;
  const repoKey = `user:${user.id}:repos`;
  const redisEtag = await redisClient.get(etagKey);//checking redis for etag
  let etag = redisEtag || "";
  // fetching repositories from github
  const response = await getReposFromGithub(githubToken, etag);
  if (response.status == 200) 
    {
    etag = response.headers.get("etag"); //retrieving etag from response
    const repoData = await response.json();//retrieving all repositories
    // creating an array of sub-objects we'd use in our front-end
    const repoList = repoData.map((e) => ({
      repoId: e.id,
      repoName: e.name,
      repoUrl: e.html_url,
      isPrivate: e.private,
    }));
    // saving new etag and repoList to redis
    await redisClient.set(repoKey, JSON.stringify(repoList));
    await redisClient.set(etagKey, etag);
    // returning repoList to user
    return repoList;
  } 
  else if (response.status == 304) {
    const repoData  = await redisClient.get(repoKey);
    const repoList = JSON.parse(repoData)||[]
    return repoList
  }
}
