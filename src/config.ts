const mode:string = import.meta.env.VITE_MODE||"local" //by default my mode fallsback to local, if theres a problem with the env


// a type for individual configs
type EnvConfig = {
  backendUrl: string;
  frontendUrl: string;
};

// type for config map
    type Config = {
      [key: string]: EnvConfig;
    };


    // my config map
const config:Config = {
  local: {
    backendUrl: import.meta.env.VITE_LOCAL_BACKEND_URL,
    frontendUrl: import.meta.env.VITE_LOCAL_FRONTEND_URL,
  },
  remote: {
    backendUrl: import.meta.env.VITE_REMOTE_BACKEND_URL,
    frontendUrl: import.meta.env.VITE_REMOTE_FRONTEND_URL,
  },
}; //my config map

// fallback to local if mode is invalid
const { backendUrl, frontendUrl } = config[mode] || config.local;



export function getUrls() {
  console.log("frontend url:", frontendUrl, "backend url:", backendUrl);
  return { frontendUrl, backendUrl };
}