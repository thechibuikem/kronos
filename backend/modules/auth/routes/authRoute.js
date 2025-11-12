import rateLimit from "express-rate-limit"

import { signupUser, logInUser } from "../controllers/authController.js";
import { githubOauth, githubCallback } from "../controllers/oauthController.js";
import express from 'express'
const router = express.Router()


router.get("/", (req, res) => {
  res.send("Server is running");
});


router.post('/signup',signupUser)
router.post("/login", logInUser);
router.get('/github',githubOauth)
router.get('/github/callback',githubCallback)//oauth callback route

export default router