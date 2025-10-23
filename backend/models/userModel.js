import mongoose from "mongoose";

// creating schemal for users
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
});

// creating models for kronos users
export const userModel = mongoose.model("userModel", userSchema);
