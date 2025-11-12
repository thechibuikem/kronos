// server.js
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import rateLimit from "express-rate-limit"
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "../modules/auth/routes/authRoute.js"

// rate limiter for auth root
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});


dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data (like form submissions)
app.use("/api/auth",authLimiter)
app.use("/api/auth", authRoutes);



app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url)
  next()
})

// Use the routes
// A test route directly in server.js
app.get("/api", (req, res) => {
  res.send("Server is running");
});



  connectDB()
  .then(()=>{
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
  })
  .catch((err)=>console.error("db connection failed",err))

