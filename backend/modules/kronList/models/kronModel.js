import mongoose from "mongoose";


// creating schemal for users
// const kronSchema = new mongoose.Schema({
//   repoId :{ type: String, required: true, unique: true },
//   repoUrl: { type: String},
//   repoName: { type: String },
//   githubOwnerId: { type: String},
// isPrivate:{type:Boolean}
// });


// creating a schema referencing our Repo schema
const kronSchema = new mongoose.Schema({
  githubOwnerId: { type: String },
  repoId: { type: mongoose.Schema.Types.ObjectId, ref: "repo" },
});

// creating models for kronos users repos
export const KronModel = mongoose.model("kron", kronSchema);

