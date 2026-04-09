import { createOctokit } from "../../../core/octokit.client.js";
import { userModel } from "../../user/models/userModel.js";

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

    const commits = data.commits;
    if (!commits) {
      throw new Error("commits DNE");
    }

    // takes in commit from commits array and modifes it to include more specific file-based data.
    const enrichedCommits = await Promise.all(
      commits.map(async (commit) => {
        const richer = await getRicherCommitData(commit, data, octokitClient);

        if (!richer) {
          throw new Error("richer DNE");
        }

        return {
          id: commit.id,
          message: commit.message,
          timestamp: commit.timestamp,
          author: commit.author?.username,
          files: richer, // enriched data
        };
      }),
    );

    return enrichedCommits;
  } catch (error) {
    throw new Error("unexpected error at file based webhook data", error);
  }
}

// helper function to get file-based data which webhook omits
export async function getRicherCommitData(commit, data, octokitClient) {
  try {
    const owner = data.repository.owner.login; 
    const repo = data.repository.name;
    const sha = commit.id;

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
    console.error("Error at getRicherCommitData:", error.message);
    throw new Error("error at get richer commit data", error);
  }
}
