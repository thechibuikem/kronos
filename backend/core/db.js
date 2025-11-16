import dotenv from 'dotenv';
import mongoose from "mongoose";// import mongoose ODM
import { redisClient } from './redisClient.js';

dotenv.config();

// initializing redis
redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();
console.log("Connected to Redis ✅");

// async function to connect to mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ✅`); // tell me that I've connected successfully if I have
  } catch (err) {
    console.log("error connecting to mongo db", err);
  }
};

export default connectDB