import { signupUser,loginUser } from '../controllers/authController.js';
import { githubOauth,gitHubToken } from '../controllers/oauthController.js';
import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Server is running");
});


router.post('/signup',signupUser)
router.post('/login',loginUser)
router.get('/github',githubOauth)
router.get('/github/callback',gitHubToken)//oauth callback route

export default router