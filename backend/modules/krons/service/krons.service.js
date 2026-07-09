import { KronModel } from "../models/krons.model.js";
import { RepoModel } from "../../repos/models/repos.model.js";
//1. function to get kron from RepoId
export async function getKronByRepoId(repoId) {
  const requiredKron = await KronModel.findOne({ repoId });
  return requiredKron;
}

// 2. Get a particular Kron
export async function getKron(id) {
  return KronModel.findOne({ repoId: id }).populate("repo");
}

//3. kron Input validator
export async function kronValidator(githubOwnerId, repoId, limit) {
  const kron = await KronModel.findOne({ githubOwnerId, repoId });
  const userKrons = await KronModel.find({ githubOwnerId });
  if (kron) {
    const err = new Error("kron already exists");
    console.error({ message: err.message, location: "krons/krons.service.js" });
    throw err;
  }

  if (userKrons.length >= limit) {
    const err = new Error(`cannot add more than ${limit - 1} krons`);
    console.error({ message: err.message, location: "krons/krons.service.js" });
    throw err;
  }
}

//4. function to get Repo from RepoId
export async function deleteKron(repoId) {
  // try {
  const requiredKron = await getKronByRepoId(repoId);
  if (!requiredKron) {
    console.error({
      message: "required kron, does not exist",
      location: "krons/krons.service.js",
      error: "required kron, does not exist at mongoDB",
    });

    return {
      error: {
        message: "required kron, does not exist",
      },
    };
  }

  await KronModel.deleteOne({ repoId: requiredKron.repoId });
  return {
    status: 200,
    data: {
      message: "kron-deleted successfully",
    },
  };
}

// 5. get actual kron objects from mongo
export async function getKronsFromMDB(user) {
  const mdbKrons = await KronModel.find({ githubOwnerId: user.id }).populate(
    "repo",
  );
  const kronList = mdbKrons.map((kron) => kron.repo).filter(Boolean);
  return kronList;
}

export async function addKron(kronData) {
console.log("kronData at addKron\n",kronData)


  const requiredRepo = await RepoModel.findOne({ repoId: kronData.repoId });

if (!requiredRepo) {
    const errorMsg = "required Repo, does not exist at mongoDB";
    console.error({
      message: "required Repo, does not exist",
      location: "krons/krons.service.js",
      error: errorMsg,
    });
    throw new Error(errorMsg); // Stop execution and pass the error to your controller
  }

  const newKronData = {
    repo: requiredRepo._id,
    githubOwnerId: kronData.githubOwnerId,
    repoId: requiredRepo.repoId,
  };

  try {
    await kronValidator(newKronData.githubOwnerId, newKronData.repoId, 5);
    // save to Database
    const newKron = new KronModel(newKronData);
    await newKron.save();
    // 5. Hydrate the "repo" field with the full document before returning to the frontend
    return newKron.populate("repo");
  } catch (err) {
    console.error(err.message);
    throw err;
  }

}