import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { connectRedis } from "./redis.client.js"
import { getUrls } from "./config.js";
import { verifyWebhookSignature } from "./middlewares/webhook.middleware.js";
import authRoutes from "../modules/auth/routes/auth.route.js";
import repoRoutes from "../modules/repos/routes/repo.routes.js";
import kronRoutes from "../modules/krons/routes/krons.route.js";
import changeDetectionRoutes from "../modules/changeDetection/routes/changeDetection.routes.js";

dotenv.config();

// 1. getting urls
const { frontendUrl, backendUrl } = getUrls();

// 2. constructing auth limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Kronos says too many attempts,try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. mounting CORS
const allowedOrigin = frontendUrl;
const corsOptions = {
  origin: allowedOrigin,
  credentials: true, //for headers|cookies
};

//4. initializing express app
const app = express();
const PORT = process.env.PORT || 5000;

// 5. mounting middleware packages
app.use(cors(corsOptions));

app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.url.includes("/webhook-data")) {
        req.rawBody = buf;
      }
    },
  }),
);



app.use(cookieParser());

/**  
  6. rate limiter for my endpoints
 app.use("/api/auth", authLimiter);
 */


// *. middle ware that logs every request coming to my server
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

//*. a test route directly in server.js
app.get("/api", (req, res) => {
  res.send("Server is running");
});

// 7. mounting authentication endpoints
app.use("/api/v1/auth", authRoutes);

// 8. mounting watchlist endpoints
app.use("/api/v1/repos", repoRoutes);

// 9. mounting kronlist endpoints
app.use("/api/v1/krons", kronRoutes);

//10. mounting change detection endpoints
app.use("/api/v1/changeDetection", changeDetectionRoutes);

// 11. starting server
async function startServer() {
  try {
    await connectDB();
    await connectRedis();
    // await startCronJobs();

    app.listen(PORT, () => {
      console.log(`Server running on port:${backendUrl}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
  }
}

await startServer()