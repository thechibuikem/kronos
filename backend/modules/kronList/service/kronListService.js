//service to get list of repositories from github
import { KronModel } from "../models/kronModel.js";

//kron Input validator
export async function kronValidator (githubOwnerId,repoId,limit) {  
const kron = await KronModel.findOne({repoId:repoId})
const userKrons = await KronModel.find({githubOwnerId:githubOwnerId})
if (kron){
  return ({error:"cannot add duplicate krons"})
}
else if (userKrons.length > limit){
return ({error:`cannot add more than ${limit} krons`})
}

else{
  return
}}
//function to add Krons to my KronList
export async function addKron (newKronData) {
console.log("\nrepo at add Kron", newKronData);
const newKron = new KronModel(newKronData);
await newKron.save()
  }






// get repos from redis
export async function getKronsFromMDB(user) {
const mdbKrons = await KronModel.find({ githubOwnerId: user.id }).populate("repoId");//“Take the repo ObjectId and replace it with the actual repo document from the Repo collection.” e.g
/* {
  _id: "kron123",
  userId: "user1",
  repo: {
    _id: "repo456",
    repoName: "my-project",
    repoUrl: "https://github.com/...",
    isPrivate: false
  }
}*/
const kronList = mdbKrons.map((kron)=>kron.repoId)

console.log("\n\n\nmy krons from mdb",kronList)
return kronList //returning krons from mongodb
}

  //function to get Krons from mdb
export async function getKrons (user) {
// const redisKrons = getKronsFromRedis(user)
const kronList = await getKronsFromMDB(user)
// console.log(kronList);
return kronList;
}