
const mode = process.env.local
const localBackendUrl=  process.env.localBackendUrl
const remoteBackendUrl= process.env.remoteBackendUrl
const localFrontendUrl=  process.env.localFrontendUrl
const remoteFrontendUrl = process.env.remoteFrontendUrl;

// defining urls to be used

let backendUrl
let frontendUrl

// dynamically initializing them
mode == "local" ? backendUrl = localBackendUrl : remoteBackendUrl
mode == "local" ? frontendUrl = localFrontendUrl : remoteFrontendUrl

export function getUrls (){
  return {frontendUrl,backendUrl}
} 
