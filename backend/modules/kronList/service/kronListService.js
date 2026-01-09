//service to get list of repositories from github
import { RepoModel } from "../../repoList/models/repoModel.js";
import { KronModel } from "../models/kronModel.js";


//1. function to get Repo from RepoId
export async function getRepoFromRepoId(repoId) {
  const requiredRepo = await RepoModel.findOne({_id:repoId});
  return requiredRepo;
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

//3. function to add Krons to my KronList
export async function addKron (newKronData) {
console.log("\nrepo at add Kron", newKronData);
const newKron = new KronModel(newKronData);
await newKron.save()
  }

//4. function to get Repo from RepoId
export async function deleteKron(requiredRepo) {
  console.log("kron to be deleted",requiredRepo)
  await KronModel.deleteOne({repoId:requiredRepo.repoId})
  console.log("kron deletion completed");
}
 
// 5. get actual kron objects from mongo
export async function getKronsFromMDB(user) {
  const mdbKrons = await KronModel
  .find({ githubOwnerId: user.id })
  .populate(
    "repo"
  ); //populate with actual repo-references

  // console.log(mdbKrons.repo,"krons at kronos",mdbKrons.length)

  const kronList = mdbKrons.map((kron) => kron.repo);//map out the actual krons

  return kronList; //returning krons from mongodb
} 