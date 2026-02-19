import { createOctokit } from "../../../core/octokit.client.js"
import { getRefreshTokenFromRedis } from "../../../core/redisClient.js"
import { userModel } from "../../user/models/userModel.js"


//1. Service to respond to webhook response provider.
export async function webHookService(data){
console.log("it got to the WebHookService\n",data,"\n")
}



//2. Service  to add a webhook to a repository. 
export async function addWebHook(webhookData,refreshToken){
try{



  // console.log(webhookData)
  const repourl = `POST /repos/${webhookData.owner}/${webhookData.repoName}/hooks` //endoint for webHook addition
// const refreshToken = getRefreshTokenFromRedis(webhookData.refreshToken)
  const requiredUser = await userModel.findOne({ refreshToken :refreshToken});


  console.log(repourl)
    const octokitClient = createOctokit(requiredUser.githubToken)
    await octokitClient.request(repourl, {
      owner: webhookData.owner,
      repo: webhookData.repoName,
      name: "web",
      active: true,
      events: ["push"],
      config: {
        url: "http://localhost:5000/api/changeDetection/webhook",
        content_type: "json",
        insecure_ssl: "0",
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
}
catch(error){
  console.log("error occured when adding webhook",error)
}

}
