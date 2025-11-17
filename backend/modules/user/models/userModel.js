import mongoose from "mongoose";

// creating schemal for users
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String },
  username:{type:String},
  failedAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number, default: null },
  githubId:{type:Number,unique:true,sparse:true},
  repos_url: { type: [String], default: [] },
  avatar_url: { type: String },
  roles: { type: [String], default: ["user"] },
  createdAt: { type: Date, default: Date.now },
});

// creating models for kronos users
export const userModel = mongoose.model("userModel", userSchema);
