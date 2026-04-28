import express from "express"
import { getAllReposController } from "../controller/repoListController.js"
import { verifyrefreshToken } from "../../../core/middlewares/refreshToken.middleware.js"

const router = express.Router()//creating router instance

router.get("/repos",verifyrefreshToken,getAllReposController)

export default router