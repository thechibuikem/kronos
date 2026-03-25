import { webhookModel } from "../models/webhookModel.js"

// service to add webhook to mongoDB collection
export async function addWebhookToMDB (githubHookId,githubOwnerId,repo){
try{
const existingWebhookEntry = await webhookModel.findOne({githubHookId})
// . webhook DNE
if (!existingWebhookEntry){
// . create new webhook instance
const newWebhook = webhookModel({
    githubHookId:githubHookId,
    githubOwnerId:githubOwnerId,
    repo:repo
})
}

await newWebhook.save()
console.log("saved new webhook successfully")
return
}
catch(error){
    throw new Error ("error occured while adding webhook to mongoDB")
}
}

// service to remove webhook from mongoDB collection and return the hookId
export async function delWebhookFromMDB(githubOwnerId,repo){

const requiredWebhook = await webhookModel.findOne({
    $and:[
        {githubOwnerId},{repo}
    ]
})

const githubHookId = requiredWebhook.githubHookId

await webhookModel.deleteOne({_id:requiredWebhook._id})
return githubHookId
}