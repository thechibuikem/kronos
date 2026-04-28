import { KronModel } from "../models/krons.model.js";
import { RepoModel } from "../../repos/models/repos.model.js";
//1. function to get kron from RepoId
export async function getKronByRepoId(repoId) {
  const requiredKron = await KronModel.findOne({repoId});
  return requiredKron;
}

//2. kron Input validator
export async function kronValidator (githubOwnerId,repoId,limit) {  
const kron = await KronModel.findOne({githubOwnerId,repoId})
const userKrons = await KronModel.findOne({githubOwnerId})
if (kron){
       console.error({
         message: "cannot add duplicate krons",
         location: "krons/krons.service.js",
         error: "kron already exists for user in mongoDB",
       });


    return {
      error: {
        message: "kron already exists",
      },
    };
      
}


else if (userKrons.length >= limit){
       console.error({
         message: `cannot add > ${limit-1} krons`,
         location: "krons/krons.service.js",
         error: `cannot add > ${limit-1} krons for a single user.`,
       });


      throw new Error("kron already exists");

return {
  error: {
    message: `cannot add > ${limit-1} krons`,
  },
};
}
else{
  return
}}

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
  const mdbKrons = await KronModel
  .find({ githubOwnerId: user.id })
  .populate("repo");
  const kronList = mdbKrons
  .map((kron) => kron.repo)
  .filter(Boolean);
  return kronList;
}



//3. function to add Krons to my KronList
export async function addKron(kronData) {
  //2.3 get the repo we're registering as kron
  const requiredRepo = await RepoModel.findOne({ repoId: kronData.repoId });

  //2.4 retrieve this repos credentials
  const newKronData = {
    githubOwnerId: kronData.githubOwnerId,
    repoId: requiredRepo.repoId,
  };

  //2.5 validate 2.4 (flagged if invalid)
  const inputResponse = await kronValidator(
    newKronData.githubOwnerId,
    newKronData.repoId,
    5,
  );

  //  2.6 revoke on flag
  if (inputResponse.error) {
     throw new Error(inputResponse.error.message);

  }
  // 2.7 register kron is unflagged
  else {
   const newKron = new KronModel(newKronData);
   await newKron.save();
  }

}
