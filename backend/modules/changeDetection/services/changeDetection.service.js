import { getUrls } from "../../../core/config.js"
import { createOctokit } from "../../../core/octokit.client.js"
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

  //.2 fetching the user who's adding a webhook from mongoDB
  const requiredUser = await userModel.findOne({ refreshToken });

if (!requiredUser){
  throw new Error("user could not be found when creating web-hook")
}

  // .5 actual webhook registering operation.
  const octokitClient = createOctokit(requiredUser.githubToken);
  // .6 adding webhook
 const webhook = await octokitClient.request(repourl, {
    owner: webhookData.owner,
    repo: webhookData.repoName,
    name: "web",
    active: true,
    events: ["push"],
    config: {
      url: `${backendUrl}api/changeDetection/webhook`, //endpoint we'll send data to
      content_type: "json", //what format our data woulf come in
      insecure_ssl: "0",
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
return webhook.hookId
}
// .7 loging any error encountered while adding webhook
catch(error){
  console.log("error occured when adding webhook",error)
}
}

// service to check if webhook already exists
export async function findWebhookMdb(webhookData,refreshToken){
const requiredUser = await userModel.findOne({refreshToken})
const requiredWebhook = await webhookModel.findOne({
  $and:[
    {githubOwnerId:requiredUser.githubId},
    {repo:webhookData.repo}
  ]
})
return removeWebhook
}



// service to add webhook to 
export async function addWebhookMdb(webhookData,hookId){
  // .1 validating that hookId exists
if (!hookId){
  throw new Error("hookId unavailable @ addwebhookMdb");
}

// .2 creating webhook entry
const webhookEntry = new webhookModel({
  githubHookId: hookId,
  repo: webhookData.repo,
  githubOwnerId: requiredUser.githubId,
});

// saving hook entry to mongo db
await webhookEntry.save()
}







//4. Service  to remove a webhook from a repository. 
export async function removeWebhook(webhookData,refreshToken){
try{
  // .1 init octoKit
  const octokitClient = createOctokit(requiredUser.githubToken);

  // .2 create repourl
  const repourl = `/repos/${webhookData.owner}/${webhookData.repo}/hooks`;

  // .3 get all webhooks on desired repo.
const webhooks = octokitClient.request(`GET ${repourl}`,{
  owner: webhookData.owner,
  repo: webhookData.repo,
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})

// .4
const requiredWebhook = webhooks.find(webhook=>webhook.name === webhookData.repo)

  const requiredUser = await userModel.findOne({ refreshToken });
  if (!requiredUser) {
    throw new Error("user could not be found when creating web-hook");
  }
}
// .7 loging any error encountered while adding webhook
catch(error){
  console.log("error occured when adding webhook",error)
}

}