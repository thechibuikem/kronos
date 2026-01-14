import octoKit from "octokit";

// function to create octokit client
export function createOctoKitClient(token){
const octokit = new octoKit({
  auth: token,
});

return octokit
;}