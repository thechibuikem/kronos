import { KronModel } from "../models/kronModel.js";
import { RepoModel } from "../../repoList/models/repoModel.js";
//1. function to get kron from RepoId
export async function getKronByRepoId(repoId) {
  const requiredKron = await KronModel.findOne({_id:repoId});
  return requiredKron;
}

//2. kron Input validator
export async function kronValidator (githubOwnerId,repoId,limit) {  
const kron = await KronModel.findOne({repoId:repoId})
const userKrons = await KronModel.find({githubOwnerId:githubOwnerId})
if (kron){
  return ({error:"cannot add duplicate krons"})
}
else if (userKrons.length >= limit){
return ({error:`cannot add more than ${limit} krons`})
}
else{
  return
}}

//4. function to get Repo from RepoId
export async function deleteKron(repoId) {
try {
  const requiredKron = await getKronByRepoId(repoId);
  await KronModel.deleteOne({ repoId: requiredKron.repoId });
  console.log("kron deletion completed");
  return;
} 
// 4.2 error handling
  catch (error) {
throw new Error(error)
};
}

// 5. get actual kron objects from mongo
export async function getKronsFromMDB(user) {
  const mdbKrons = await KronModel
  .find({ githubOwnerId: user.id })
  .populate("repo"); //populate with actual repo-references
  const kronList = mdbKrons.map((kron) => kron.repo);//actual krons
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
  if (!inputResponse) {
  console.log("\nrepo @ add Kron", newKronData);
  const newKron = new KronModel(newKronData);
  await newKron.save();
  }
  // 2.7 register kron is unflagged
  else {
      // res.json({ error: inputResponse.error
      // res.json({ error: inputResponse.error
      //  });

      throw new Error ("kron already exists")
  }

}
