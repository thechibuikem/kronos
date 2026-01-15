import {Octokit} from "octokit";

let octokitClient = null;


// function to initialize octokit, to br used in the oauth flow
export function initOctokit (accessToken,callback){
 octokitClient = new Octokit({
  auth: accessToken,
});

if (callback) callback();
}


// getter function for octokit
export function getOctokit(){
  if (!octokitClient){
    throw new Error("octokit is not initialized")
  }
}

