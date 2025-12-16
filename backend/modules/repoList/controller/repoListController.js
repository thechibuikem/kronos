import { getRepos, getReposFromRedis } from "../services/repoListServices.js";
import { getMDBUserThroughRefreshToken } from "../../user/service/user.service.js";

// 
export async function getAllReposController(req, res) {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken; //refresh token cookie
  const user = await getMDBUserThroughRefreshToken(refreshToken); //retrieving user using refresh token
  const allRepos = await getRepos(user); //all our repos from redis
  console.log("all Repos", allRepos);
  res.json({ type: "repos", allRepos: allRepos }).status(200);
}
