import express from "express"
import { addWebhookController, webhookDataController,removeWebhookController } from "../controllers/changeDetection.controller.js"
import { verifyWebhookSignature } from "../../../core/middlewares/webhook.middleware.js";
import { verifyrefreshToken } from "../../../core/middlewares/refreshToken.middleware.js";


const router = express.Router()//creating router instance

//=========routes for change detection service=====//
router.post("/webhook-data",verifyWebhookSignature, webhookDataController);
router.post("/webhook",verifyrefreshToken,addWebhookController)
router.delete("/webhook/:repoId",verifyrefreshToken,removeWebhookController);

export default router