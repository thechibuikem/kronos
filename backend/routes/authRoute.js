import { signupUser,loginUser } from '../controllers/authController.js';
import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Server is running");
});

// signing up route
router.post('/api/auth/signup',signupUser)
router.post('/api/auth/login',loginUser)

export default router