import { signupUser } from '../controllers/authController.js';
import express from 'express'
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Server is running");
});


// signing up route
router.post('/api/auth/signup',signupUser)

export default router