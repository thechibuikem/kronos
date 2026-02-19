import { Octokit } from "octokit";

// let octokitClient = null;

// function to initialize octokit, to br used in the oauth flow
export function createOctokit(accessToken, callback) {
  let octokitClient = new Octokit({
    auth: accessToken,
  });

  // alerting that octoKit has been initialized
  if (octokitClient) {
    console.log("octokit client initialized successfully");
    return octokitClient
  }
  else{
    console.log("octokit client was not initialized successfully");
    return
  }
}

// // // getter function for octokit
// // export function getOctokit() {
// //   if (!octokitClient) {
// //     throw new Error("octokit is not initialized");
// //   }
// //   return octokitClient;
// // }

// // function to create an octokit client.
// export function createOctokit(accessToken) {
//   return new Octokit({ auth: accessToken });
// }