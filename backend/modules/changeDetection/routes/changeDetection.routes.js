import express from "express"
import { webHookController } from "../controller/changeDetection.controller.js"



const router = express.Router()//creating router instance

//=========routes for change detection service=====//
router.get("/webhook",webHookController)

export default router