import { getUrls } from "../../../core/config.js"
import { createOctokit } from "../../../core/octokit.client.js"
import { RepoModel } from "../../repoList/models/repoModel.js"
import { userModel } from "../../user/models/userModel.js"
import { webhookModel } from "../models/webhookModel.js"

// 1. Get backend-url
const {backendUrl} = getUrls()

//2. Service to respond to webhook response provider.
export async function getWebhookData(data) {
  //.1 logging the data being sent to our webHook service
  console.log("it got to the WebHookService\n", data, "\n");
}

//3. Service  to add a webhook to a repository. 
export async function addWebhookGithub(webhookData,refreshToken){
try{
  // .1 github's standard url for adding webhook
  const repourl = `POST /repos/${webhookData.owner}/${webhookData.repo}/hooks`; //endoint for webHook addition

  //.2 validate kronos user
  const requiredUser = await userModel.findOne({ refreshToken });
if (!requiredUser){
  throw new Error("user could not be found when creating web-hook")
}

  // .3 initialize octokit client
  const octokitClient = createOctokit(requiredUser.githubToken);

  // .4 registering webhook @ github
 const webhook = await octokitClient.request(repourl, {
    owner: webhookData.owner,
    repo: webhookData.repoName,
    name: "web",
    active: true,
    events: ["push"],
    config: {
      url: `${backendUrl}api/v1/changeDetection/webhook`, 
      content_type: "json", 
      insecure_ssl: "0",
    },//settings on data from github
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // .5 handling errors @ reg webhook
if (!webhook){
 throw new Error("webhook registeration unsuccessful")
}

// .6 returning webhook Id
return webhook.data.id
}
// .7 error handling
catch(error){
  throw new Error ("error occured @ adding webhook github",error)
}
}
// service to check if webhook already exists
export async function findWebhookMdb(repoName,refreshToken){
  // .1 validating kronos user
const requiredUser = await userModel.findOne({refreshToken})
if (!requiredUser){
  throw new Error ("required user DNE @ findWebhookMdb")
}

// .2 locate webhook in our mdb collection 
const requiredWebhook = await webhookModel.findOne({
  $and:[
    {githubOwnerId:requiredUser.githubId},
    {repo:repoName}
  ]
})
return requiredWebhook
}

// service to add webhook to 
export async function addWebhookMdb(refreshToken, webhookData, hookId) {
  // .1 validating that hookId exists
  if (!hookId) {
    throw new Error("hookId unavailable @ addwebhookMdb");
  }

  //.2 validating kronos user
  const requiredUser = await userModel.findOne({ refreshToken });

if (!requiredUser) {
  throw new Error("user could not be found when creating web-hook");
}


  // .2 creating webhook entry
  const webhookEntry = new webhookModel({
    githubHookId: hookId,
    repo: webhookData.repo,
    githubOwnerId: requiredUser.githubId,
  });

  //.3 saving hook entry to mongo db
  await webhookEntry.save();  
}

export async function removeWebhookGithub(repoId, refreshToken) {

try{
  //.1 validating user
  const requiredUser = await userModel.findOne({ refreshToken });

  if (!requiredUser) {
    throw new Error("user DNE @ remove web-hook github");
  }

  //.2 validating kronos user
  const requiredRepo = await RepoModel.findOne({ repoId });

  if (!requiredRepo) {
    throw new Error("repo DNE @ removing web-hook github.");
  }

  const requiredWebhook = await findWebhookMdb(
    requiredRepo.repoName,
    requiredUser,
  );

  if (!requiredWebhook) {
    throw new Error("webhook DNE @ removing web-hook Github.");
  }

console.log("")

  // .1 init octoKit
  const octokitClient = createOctokit(requiredUser.githubToken);

  // .2 create repourl
  const repourl = `/repos/${requiredUser.username}/${requiredWebhook.repo}/hooks/${requiredWebhook.githubHookId}`;
  console.log("repourl @ rmWebhook");

 const response = await octokitClient.request(`DELETE ${repourl}`, {
    owner: requiredUser.username,
    repo: requiredWebhook.repo,
    hook_id: requiredWebhook.githubHookId,
    headers: {
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });

    console.log("webhook deleted successfully @ github",response)
}catch(error){
  throw new Error(`error occured @ removing webhook github:${error}`);
}
}


export async function removeWebhookMdb(repoId, refreshToken) {
try {
  const requiredUser = await userModel.findOne({ refreshToken });

  if (!requiredUser) {
    throw new Error("user could not be found when creating web-hook");
  }

  //.2 validating kronos user
  const requiredRepo = await RepoModel.findOne({ repoId });

  if (!requiredRepo) {
    throw new Error("repo DNE @ removing web-hook Github.");
  }

  const requiredWebhook = await findWebhookMdb(
    requiredRepo.repoName,
    requiredUser,
  );

  if (!requiredWebhook) {
    throw new Error("webhook DNE @ removing web-hook Github.");
  }

  webhookModel.deleteOne(requiredWebhook);
    console.log("webhook deleted successfully @ mdb");
} catch (error) {
  throw new Error("error occured @ removing webhook mdb", error);
}
}





