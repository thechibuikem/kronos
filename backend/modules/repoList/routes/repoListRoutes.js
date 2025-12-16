import express from "express"
import { getAllReposController } from "../controller/repoListController.js"

const router = express.Router()//creating router instance

router.get("/allRepos",getAllReposController)

export default router