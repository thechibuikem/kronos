import dotenv from 'dotenv';
import mongoose from "mongoose";// import mongoose ODM


dotenv.config();
// async function to connect to mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // tell me that I've connected successfully if I have
  } catch (err) {
    console.log("error connecting to mongo db", err);
  }
};

export default connectDB