// server.js
const cors = require('cors');
const bodyParser = require('body-parser');
import express from "express";
import authRoute from "./routes"; // import our routes

const app = express();
const PORT = process.env.PORT|| 5000;

app.use(cors())
app.use(express.json())
// Middleware to parse request bodies
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data (like form submissions)

// Use the routes
app.use("/api/signup", authRoute);

// A test route directly in server.js
app.get("/api/signup", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
