import {Octokit} from "octokit";

// function to create octokit client
export function createOctoKitClient(token){
const octokit = new Octokit({
  auth: token,
});

return octokit
;}