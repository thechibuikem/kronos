import rateLimit from "express-rate-limit"
import bearerMiddleware from "../../../core/middlewares/auth.middleware.js";
import { githubOauth, githubCallback } from "../controllers/oauthController.js";
import { generateAccessToken } from "../controllers/refreshToken.controller.js";
import express from 'express'
import { logOut } from "../controllers/logout.controller.js";
import { verifyrefreshToken } from "../../../core/middlewares/refreshToken.middleware.js";
// 
const router = express.Router()
router.get("/", (req, res) => {
  res.send("Server is running");
});
router.get('/github',githubOauth)
router.get('/github/callback',githubCallback)//oauth callback route
router.post('/refresh-token',verifyrefreshToken,generateAccessToken)//validating refresh-tokens
router.post('/logout',verifyrefreshToken,logOut)
router.post("/validate-token",bearerMiddleware,
   (req, res) => {res.sendStatus(204)
   });


export default router
