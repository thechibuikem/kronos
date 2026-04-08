import { createOctokit } from "../../../core/octokit.client.js";
import { userModel } from "../../user/models/userModel.js";

//2. Service to respond to webhook response provider.
export function getFileBasedWebhookData(data) {
try {
  if (!data) {
    throw new Error("webhook data @ get webhook data service");
  }

  const getFileBasedWebhookData = {
    githubId: data.sender.id,
    added: data.added,
    removed: data.removed,
    modified: data.modified,
    commits: data.commits,
  };

  return getFileBasedWebhookData;


} catch (error) {
  throw new Error("unexpected error at file based webhook data");
}
}

//1. service to get line-by-line commit data
export async function getLineBasedWebhookData(data) {
try{
  if (!data) {
    throw new Error("webhook data @ get webhook data service");
  }

  const requiredUser = await userModel.findOne({ githubId: data.sender.id });

  if (!requiredUser) {
    throw new Error("user could not be found when creating web-hook");
  }
  const octokitClient = createOctokit(requiredUser.githubToken);

  // commit specific data
  const res = await octokitClient.request(
    `GET /repos/${data.sender.login}/${data.repository.name}/commits/${data.after}`,
    {
      owner: data.sender.login,
      repo: data.repository.name,
      sha: data.after, // from your webhook JSON
    },
  );

    if (!res) {
      throw new Error("res DNE @ get webhoook data service");
    }


const lineBasedWebhookData = {
  data:res.data
}

  if (!lineBasedWebhookData) {
    throw new Error("line based webhook data DNE @ get webhook data service");
  }

console.log("entire data @ get webhook data service",response)

  return lineBasedWebhookData;
}catch(error){
  throw new Error("unexpected error at get line based webhook data", error)
}

}