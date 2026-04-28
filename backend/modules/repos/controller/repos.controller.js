import { getRepos, getReposFromRedis } from "../service/repos.service.js";
import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";

// getting all krons from mdb
export async function getAllReposController(req, res) {
  try{
  const refreshToken = req.cookies.refreshToken;
  const user = await getMDBUserThroughRefreshToken(refreshToken); //retrieving user using refresh token
  const allRepos = await getRepos(user); //all our repos, following cache-aside rules
  const responseBody = {};
  // preparing my response body
  if (allRepos) {
    responseBody.repos = allRepos;
  }

  res.status(200).json({ data: responseBody });
  }
  catch(error){
     console.error("kron deletion controller", error);
     res.status(500).json({
       error: {
         message: "Failed to fetch repos",
         code: "GET_REPOS_FAILED",
       },
     });
  }
}



