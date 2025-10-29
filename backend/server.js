// server.js
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data (like form submissions)
app.use(authRoutes)



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

