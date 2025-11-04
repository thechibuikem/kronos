import mongoose from "mongoose";

// creating schemal for users
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: false },
  github_id:{type:Number,unique:true},
  repos_url:{type:String,unique:true},
  avatar_url:{type:String}
});

// creating models for kronos users
export const userModel = mongoose.model("userModel", userSchema);
