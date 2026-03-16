import mongoose from "mongoose";

// async function to connect to mongodb
async function connectDB   (){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB 🌟`);
  } 
  catch (err) {
    console.log("error connecting to mongo db 💣\n", err);
  }
};

export default connectDB