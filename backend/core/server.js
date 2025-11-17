// server.js
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "../modules/auth/routes/authRoute.js";

//-- confiigurations
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
const allowedOrigin = "http://localhost:5173";
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,//for headers|cookies
};
dotenv.config();

//-- mountings
const app = express();
const PORT = 5000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser());    
// app.use("/api/auth", authLimiter);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Use the routes
// A test route directly in server.js
app.get("/api", (req, res) => {
  res.send("Server is running");
});

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT} ✅`)
    );
  })
  .catch((err) => console.error("db connection failed", err));
