import { createOctokit } from "../../../core/octokit.client.js"
import { userModel } from "../../user/models/userModel.js"
import { getUrls } from "../../../core/config.js"
// 1. Get backend-url
const {backendUrl} = getUrls()

//2. Service to respond to webhook response provider.
export async function webHookService(data){

  //.1 logging the data being sent to our webHook service
console.log("it got to the WebHookService\n",data,"\n")
}


//3. Service  to add a webhook to a repository. 
export async function addWebHook(webhookData,refreshToken){
try{
  //.0 logging the data being sent to from our client
  console.log("webhook data @addWebHook",webhookData);

  // .1 github's standard url for adding webhook
  const repourl = `POST /repos/${webhookData.owner}/${webhookData.repo}/hooks`; //endoint for webHook addition

  //.2 fetching the user who's adding a webhook from mongoDB
  const requiredUser = await userModel.findOne({ refreshToken: refreshToken });

  //.4 logging the repoUrl being crafted 
  console.log(repourl);

  // .5 actual webhook registering operation.
  const octokitClient = createOctokit(requiredUser.githubToken);
  // .6 adding webhook
  await octokitClient.request(repourl, {
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
}
// .7 loging any error encountered while adding webhook
catch(error){
  console.log("error occured when adding webhook",error)
}

}
