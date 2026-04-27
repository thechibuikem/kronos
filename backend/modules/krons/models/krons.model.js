import mongoose from "mongoose";

// creating a schema referencing our Repo schema
const kronSchema = new mongoose.Schema(
  {
    githubOwnerId: { type: String },
    repoId: { type: String },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// virtual for non-objectId populate
kronSchema.virtual("repo", {
  ref: "Repo",
  localField: "repoId",//kron field
  foreignField: "repoId",//repo field
  justOne: true,
});


// creating models for kronos users repos
export const KronModel = mongoose.model("Kron", kronSchema);

