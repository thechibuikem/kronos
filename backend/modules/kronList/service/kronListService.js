//service to get list of repositories from github
import { KronModel } from "../models/kronModel.js";

//kron Input validator
export async function kronValidator (repoId,githubOwnerId,limit) {
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
export async function addKron (kron) {
  // console.log("user at getRepos",user)
  const newKron = new KronModel(kron)
 await newKron.save()
  }

// get repos from redis
export async function getKronsFromMDB(user) {
const mdbKrons = await KronModel.find({ githubOwnerId: user.id });
console.log("my krons from mdb",mdbKrons)
return mdbKrons //returning krons from mongodb
}

  //function to get Krons from mdb
export async function getKrons (user) {
// const redisKrons = getKronsFromRedis(user)
const mdbKrons = await getKronsFromMDB(user)
console.log(mdbKrons)
return mdbKrons
}