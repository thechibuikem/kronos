import rateLimit from "express-rate-limit"
import authMiddleware from "../middlewares/authMiddleware.js";
import { signupUser, logInUser } from "../controllers/authController.js";
import { githubOauth, githubCallback } from "../controllers/oauthController.js";
import { checkToken } from "../controllers/refreshTokenController.js";
import express from 'express'
const router = express.Router()


router.get("/", (req, res) => {
  res.send("Server is running");
});


router.post('/signup',signupUser)
router.post("/login", logInUser);
router.get('/github',githubOauth)
router.get('/github/callback',githubCallback)//oauth callback route
router.post('/refresh-token',checkToken)//validating refresh-tokens


//protected routes
router.use(authMiddleware)
router.post("/validate-token",
   (req, res) => {res.json({ valid: true, user: req.user })   
  });


export default router