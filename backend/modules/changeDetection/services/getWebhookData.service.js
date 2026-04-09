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


 const enrichedCommits = await Promise.all(
  
  commits.map(async (commit) => {
     const richer = await getRicherCommitData(commit, data, octokitClient);

if (!richer){
  throw new Error ("richer DNE")
}


     return {
       id: commit.id,
       message: commit.message,
       timestamp: commit.timestamp,
       author: commit.author?.username,
      //  filesChanged: [...commit.added, ...commit.modified, ...commit.removed],
       files: richer, // enriched data
     };
   }),

 );

 return enrichedCommits






  // const fileBasedWebhookData = data.commits.map((commit) => ({
  //   id: commit.id,
  //   message: commit.message,
  //   timestamp: commit.timestamp,
  //   author: commit.author?.username,
  //   filesChanged: [...commit.added, ...commit.modified, ...commit.removed],
  // }));

  // // return fileBasedWebhookData;

  // const filesChangedData = fileBasedWebhookData.map((webHookData) => {getRicherCommitData(webHookData,octokitClient)});

  // fileBasedWebhookData.forEach((data,index)=>{return {...data,file:filesChangedData[index]} }
} catch (error) {
  throw new Error("unexpected error at file based webhook data",error);
}
}




export async function getRicherCommitData(commit, data, octokitClient) {

  try{
    const owner = data.repository.owner.login; // Get owner login from webhook data
    const repo = data.repository.name;
    const sha = commit.id; // The commit SHA to fetch

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

    console.log(res);

    // files extraction
    return res.data.files.map((file) => ({
      filename: file.filename,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
    }));
  }
  catch(error){
      console.error("Error at getRicherCommitData:", error.message);
    throw new Error("error at get richer commit data",error)
  }
}






// export async function getRicherCommitData(commit,octokitClient){
//       const richerCommit = await octokitClient.request(
//         `GET /repos/${commit.data}/${commit.repo}/commits/{commit.ref}`,
//         {
//           owner,
//           repo,
//           ref: commit.id,
//         },
//       );

//       const filesChangedData = richerCommit.map(file =>file.files )

//       return filesChangedData
// }











































// //1. service to get line-by-line commit data
// export async function getLineBasedWebhookData(data) {
// try{
//   if (!data) {
//     throw new Error("webhook data @ get webhook data service");
//   }

//   const requiredUser = await userModel.findOne({ githubId: data.sender.id });

//   if (!requiredUser) {
//     throw new Error("user could not be found when creating web-hook");
//   }
//   const octokitClient = createOctokit(requiredUser.githubToken);

//   // commit specific data
//   const res = await octokitClient.request(
//     `GET /repos/${data.sender.login}/${data.repository.name}/commits/${data.after}`,
//     {
//       owner: data.sender.login,
//       repo: data.repository.name,
//       sha: data.after, // from your webhook JSON
//     },
//   );
//     if (!res) {
//       throw new Error("res DNE @ get webhoook data service");
//     }

    
// const lineBasedWebhookData = {
//   data:res.data
// }
//   if (!lineBasedWebhookData) {
//     throw new Error("line based webhook data DNE @ get webhook data service");
//   }

//   return lineBasedWebhookData;
// }catch(error){
//   throw new Error("unexpected error at get line based webhook data", error)
// }

// }