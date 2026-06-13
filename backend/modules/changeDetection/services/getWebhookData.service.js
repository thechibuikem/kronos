import { createOctokit } from "../../../core/octokit.client.js";
import { userModel } from "../../user/models/user.model.js";

//2. Service to respond to webhook response provider.
export async function getWebhookData(data) {
  try {
    if (!data) {
      throw new Error("webhook data @ get webhook data service");
    }
    const requiredUser = await userModel.findOne({ githubId: data.sender.id });
    if (!requiredUser) {
      throw new Error("user not found");
    }
    const octokitClient = createOctokit(requiredUser.githubToken);

  console.log(data)
    const commits = data.commits;
    const repository = data.repository;
    if (!commits) {
      throw new Error("commits DNE");
    }
        if (!data.repository) {
      throw new Error("data.repository DNE");
    }

    // takes in commit from commits array and modifes it to include more specific file-based data.
    const enrichedCommits = await Promise.all(
      commits.map(
        async (commit) => {
        const richer = await getRicherCommitData(data, octokitClient);

        if (!richer) {
          throw new Error("richer DNE");
        }

        return {
          kronId: repository.id,
          userId: requiredUser._id,
          commitId: commit.id,
          message: commit.message,
          timestamp: commit.timestamp,
          files: richer, // enriched data array
        };
      }),
    );

    return enrichedCommits;
  } catch (error) {
    throw new Error(`unexpected error ${error}`,);
  }
}

// helper function to get file-based data which webhook commits
export async function getRicherCommitData(data, octokitClient) {
  try {
    const owner = data.repository.owner.login;
    const repo = data.repository.name;
    const sha = data.commit.id;

    const res = await octokitClient.request(
      `GET /repos/{owner}/{repo}/commits/{ref}`,
      {
        owner,
        repo,
        ref: sha,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!res?.data?.files) {
      throw new Error("No files data in commit response");
    }

    return res.data.files.map((file) => ({
      filename: file.filename,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
    }));
  } catch (error) {
    throw new Error(`unexpected error ${error}`);
  }
}
