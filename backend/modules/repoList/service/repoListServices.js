import { redisClient } from "../../../core/redisClient.js";
import { RepoModel } from "../models/repoModel.js";

//service to get list of repositories from github
export async function getReposFromGithub(githubToken, etag) {
  let response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "If-None-Match": etag || "",
      // "If-None-Match": "",
    },
  });

  // export async function getReposFromGithub(githubToken, etag) {
  //   let response = await fetch("https://api.github.com/user/repos", {
  //     headers: {
  //       Authorization: `Bearer ${githubToken}`,
  //       (etag && {"If-None-Match": etag})
  //     },
  //   });

  if (response.status === 304) {
    return response; // No changes
  }

  // console.log("response: ",response)

  //checking response
  if (!response.ok) {
    return console.log("repolist http response is flawed ");
  }

  return response;
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
  const redisEtagKey = `user:${user.id}:etag`;
  const redisRepoKey = `user:${user.id}:repos`; //key to retrieve repos from github
  const redisEtag = await redisClient.get(redisEtagKey); //checking redis for etag
  let etag = redisEtag || "";
  const response = await getReposFromGithub(user.githubToken, etag); // fetching repositories from github
  console.log("response status: ", response.status);

  //=== if nothing changes===
  if (response.status == 304) {
    const redisRepos = await redisClient.get(redisRepoKey);
    if (!redisRepos) {
      const githubRepos = await RepoModel.find({ githubOwnerId: user.id }); //return an array containing the repositories related to a user.
      console.log(
        "length of old repo list from mongo db: ",
        githubRepos.length
      );
      return githubRepos;
    }
    console.log("length of old repo list from redis: ", JSON.parse(redisRepos.length));
    return JSON.parse(redisRepos);
  }

  //===If something had changed in the etag===
  else if (response.status == 200) {
    etag = response.headers.get("etag"); //retrieving etag from response
    const repoData = await response.json(); //retrieving all repositories

    // filtering returned repositories to exclude forked, archives and organization owned repositories
    const filteredRepoData = repoData.filter(r=>
      (r) => !r.fork &&
      // !r.archived &&
      r.owner.type === "User"
    );

    // repoList for front-end
    const repoList = filteredRepoData.map((e) => ({
      repoId: e.id,
      repoUrl: e.html_url,
      repoName: e.name,
      githubOwnerId: user.id,
      isPrivate: e.private,
    }));

    console.log(
      "length of new repo list returned by github: ",
      repoList.length
    );

    // ========= UPDATING MONGODB ==========//

    // first delete all these users repos
    await RepoModel.deleteMany({ githubOwnerId: user.id });

    //adding a new set of repos
    await Promise.all(
      repoList.map((repo) => {
        const newRepo = new RepoModel(repo);
        return newRepo.save(); // returns a promise
      })
    );

    // ========= UPDATING REDIS ==========//
    await redisClient.set(redisRepoKey, JSON.stringify(repoList));
    await redisClient.set(redisEtagKey, etag);

    return repoList; // returning repoList to user
  }
}
