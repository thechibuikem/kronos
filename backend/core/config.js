import dotenv from "dotenv";
dotenv.config();

const mode = process.env.MODE || "local"; //by default my mode fallsback to local, if theres a problem with the env

const config = {
  local: {
    backendUrl:process.env.LOCAL_BACKEND_URL,
    frontendUrl: process.env.LOCAL_FRONTEND_URL,
  },
  remote: {
    backendUrl: process.env.REMOTE_BACKEND_URL,
    frontendUrl: process.env.REMOTE_FRONTEND_URL,
  },
}; //my config map

// fallback to local if mode is invalid
const { backendUrl, frontendUrl } = config[mode] || config.local;

export function getUrls() {
  console.log("frontend url:", frontendUrl, "backend url:", backendUrl);
  return { frontendUrl, backendUrl };
}
