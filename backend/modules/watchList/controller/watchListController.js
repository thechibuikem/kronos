import { json } from "stream/consumers";
import { getReposFromRedis } from "../services/watchListService.js";

export async function getAllReposController(req,res){
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken//refresh token cookie

    const allRepos = await getReposFromRedis(refreshToken)//all our repos from redis

console.log("all Repos",allRepos)

    res.json({type:"repos",allRepos:allRepos}).status(200)
}