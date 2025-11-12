import mongoose from "mongoose";
import { type } from "os";

// creating schemal for users
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String },
  failedAttempts: {type:Number,default:0},
  lockUntil:{type:Number,default:null},
  github_id: { type: Number, unique: true, sparse: true },
  repos_url: { type: [String], unique: true, sparse: true, default: [] },
  avatar_url: { type: String },
  refreshTokens: { type: [String], default: [] },
  roles: { type: [String], default: ["user"] },
  createdAt: { type: Date, default: Date.now },
});

// creating models for kronos users
export const userModel = mongoose.model("userModel", userSchema);
