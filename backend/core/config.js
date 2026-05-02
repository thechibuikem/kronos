import dotenv from "dotenv";
dotenv.config();

// const mode = process.env.MODE || "local";


// 4. a getter function to expose our urls
export function getUrls() {
  //1. tracking development mode
  const mode = process.env.MODE || "local";

  //2. constructing our config map
  const config = {
    local: {
      backendUrl: process.env.LOCAL_BACKEND_URL,
      frontendUrl: process.env.LOCAL_FRONTEND_URL,
    },
    remote: {
      backendUrl: process.env.REMOTE_BACKEND_URL,
      frontendUrl: process.env.REMOTE_FRONTEND_URL,
    },
  };

  //3. fallback to local if mode is invalid
  const { backendUrl, frontendUrl } = config[mode];

  console.log("frontend url:", frontendUrl, "backend url:", backendUrl);
  return { frontendUrl, backendUrl };
}
