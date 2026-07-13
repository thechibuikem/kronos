import { RepoModel } from "../models/repos.model.js";
import { createOctokit } from "../../../core/octokit.client.js";
import { redisClient } from "../../../core/redis.client.js";
import { craftRepoList } from "../utils/craftRepoList.js";

//service to get list of repositories from github
export async function getReposFromGithub(user) {
  const octokitClient = createOctokit(user.githubToken);

  // Get all repos belonging to this user
  const response = await octokitClient.request(`GET /users/${user.username}/repos`, {
    headers: {
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

  //checking response
  if (response.status === 200) {
    return response;
  }

    console.error({
      message: "repositories from github, is not okay",
      location: "repos/repos.service.js",
      error: response,
    });
    return {
      error: {
        message: "repositories from github, is not okay",
      },
    }
}

// function to get all Repos
export async function getRepos(user) {
  const TTL = 60*60*24; // 24 hours
  const redisRepoKey = `user:${user.id}:repos`;
  const cached = await redisClient.get(redisRepoKey);
  
  
  if (cached) {
    console.log("repolist from cache: \n", cached);
    return JSON.parse(cached);
  }
// cache miss
  else {
  console.log("There was a cache miss")
  const response = await getReposFromGithub(user);
  // on etag change
  if (response.status === 200) {
    const repoList = craftRepoList(response,user)
    console.log("repolist from github: \n", console.table(repoList));
    

    // ========= UPDATING MONGODB ==========//
    await RepoModel.deleteMany({ githubOwnerId: user.id });
    await Promise.all(
      repoList.map((repo) => {
        const newRepo = new RepoModel(repo);

        return newRepo.save();
      }),
    );

    // ========= UPDATING REDIS ==========//
    await redisClient.set(redisRepoKey, JSON.stringify(repoList), { EX: TTL });

    return repoList; // returning repos to client
  }

  }
}

