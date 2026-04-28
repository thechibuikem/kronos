import { redisClient } from "../../../core/redis.client.js";
import { RepoModel } from "../models/repos.model.js";

//service to get list of repositories from github
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

  //checking response
  if (!response.ok) {
     console.error({
        message: "repositories from github, is not okay",
        location: "repos/repos.service.js",
        error: "required kron, does not exist at mongoDB",
      });

      
      return {
        error: {
          message: "required kron, does not exist",
        },
      };
      
  }

  return response;
}

// get repos from redis
export async function getReposFromRedis(user) {
  const redisRepoKey = `user:${user.githubId}:repos`;
  const data = await redisClient.get(redisRepoKey); //redis repos
  return data ? JSON.parse(data) : [];
}

// function to get all Repos
export async function getRepos(user) {
  const redisEtagKey = `user:${user.id}:etag`;
  const redisRepoKey = `user:${user.id}:repos`; 
  const redisEtag = await redisClient.get(redisEtagKey); //checking redis for etag
  let etag = redisEtag || "";
  const response = await getReposFromGithub(user.githubToken, etag);
  console.log("response status: ", response.status);

  //=== if nothing changes===
  if (response.status == 304) {
    const redisRepos = await redisClient.get(redisRepoKey);
    if (!redisRepos) {
      const githubRepos = await RepoModel.find({ githubOwnerId: user.id }); 
      return githubRepos;
    }
    return JSON.parse(redisRepos);
  }

  //===If something had changed in the etag===
  else if (response.status == 200) {
    etag = response.headers.get("etag"); //retrieving etag from response
    const repoData = await response.json();
    const repoList = repoData.map((e) => ({
      repoId: e.id,
      repoUrl: e.html_url,
      repoName: e.name,
      githubOwnerId: user.id,
      isPrivate: e.private,
      owner: e.owner.login,
    })); // prepared repoList


    // ========= UPDATING MONGODB ==========//
    await RepoModel.deleteMany({ githubOwnerId: user.id });//delete all client owned repo
    
    await Promise.all(
      repoList.map((repo) => {
        const newRepo = new RepoModel(repo);
        return newRepo.save(); // returns a promise
      }),
    ); // inject in new repos



    // ========= UPDATING REDIS ==========//
    await redisClient.set(redisRepoKey, JSON.stringify(repoList));
    await redisClient.set(redisEtagKey, etag);

    return repoList; // returning repos to client
  }
}
