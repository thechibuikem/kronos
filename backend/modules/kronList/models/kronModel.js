import mongoose from "mongoose";

// creating schemal for users
const kronSchema = new mongoose.Schema({
  repoId :{ type: String, required: true, unique: true },
  repoUrl: { type: String},
  repoName: { type: String },
  githubOwnerId: { type: String},
isPrivate:{type:Boolean}
});

// creating models for kronos users repos
export const KronModel = mongoose.model("kron", kronSchema);
