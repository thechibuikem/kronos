import express from "express"
import { getAllReposController } from "../controller/repoListController.js"

const router = express.Router()//creating router instance

router.get("/repos",getAllReposController)

export default router