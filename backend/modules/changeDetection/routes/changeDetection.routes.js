import express from "express"
import { addWebhookController, webhookDataController } from "../controllers/changeDetection.controller.js"



const router = express.Router()//creating router instance

//=========routes for change detection service=====//
router.get("/webhook", webhookDataController);
router.post("/webhook",addWebhookController)

export default router