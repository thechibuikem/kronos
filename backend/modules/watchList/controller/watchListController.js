import { getReposFromRedis } from "../services/watchListService.js";

export async function getAllReposController(req,res){
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken

    const allRepos = getReposFromRedis(refreshToken)

    res.json({type:"repos",allRepos:allRepos}).status(200)
}