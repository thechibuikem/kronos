import { signupUser,loginUser } from '../controllers/authController.js';
import { githubOauth,gitHubToken } from '../controllers/oauthController.js';
import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Server is running");
});


router.post('/api/auth/signup',signupUser)// signing up route
router.post('/api/auth/login',loginUser)//login route
router.get('/api/auth/github',githubOauth)//oauth route
router.get('/api/auth/github/callback',gitHubToken)//oauth route

export default router