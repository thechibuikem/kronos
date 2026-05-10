import { redisClient } from "../../../core/redis.client.js";
import { RepoModel } from "../models/repos.model.js";
import { createOctokit } from "../../../core/octokit.client.js";

//service to get list of repositories from github
export async function getReposFromGithub(user) {
  const octokitClient = createOctokit(user.githubToken);

  const response = await octokitClient.request(`GET /users/${user.username}/repos`, {
    username: user.username,
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
    return JSON.parse(cached);
  }

  // ========= HANDLING CACHE MISS ==========//

  const response = await getReposFromGithub(user);
  //===If something had changed in the etag===
  if (response.status === 200) {
    const repoList = response.data.map((e) => ({
      repoId: e.id,
      repoUrl: e.html_url,
      repoName: e.name,
      githubOwnerId: user.id,
      isPrivate: e.private,
      owner: e.owner.login,
    })); // prepared repoList

    // ========= UPDATING MONGODB ==========//
    await RepoModel.deleteMany({ githubOwnerId: user.id });
    await Promise.all(
      repoList.map((repo) => {
        const newRepo = new RepoModel(repo);
        return newRepo.save();
      }),
    ); // inject in new repos

    // ========= UPDATING REDIS ==========//
    await redisClient.set(redisRepoKey, JSON.stringify(repoList),{EX:TTL});

    return repoList; // returning repos to client
  }
}
