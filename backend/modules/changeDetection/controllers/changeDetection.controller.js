import { addWebhookMdb, findWebhookMdb, getWebhookData } from "../services/changeDetection.service.js";
import { addWebhookGithub } from "../services/changeDetection.service.js";
import { removeWebhook } from "../services/changeDetection.service.js";

// this controller would be mounted at the webhook 
export async function webhookDataController(req, res) {
const data = req.body
// const refreshToken = req.cookies.refreshToken;
getWebhookData(data)
}

export async function removeWebhookController(req,res){
const refreshToken = req.cookies.refreshToken;
if (!refreshToken){
    console.log("refresh Token @ remove webhook controller DNE")
}
const webhookData = req.data
if (!webhookData){
    console.log("no payload @ remove webhook controller")
}
await removeWebhook(webhookData,refreshToken)
}



export async function addWebhookController(req,res) {
    const webhookData = req.body
    const refreshToken = req.cookies.refreshToken;

console.log(req.body,req.cookies.refreshToken)

    if (!refreshToken||webhookData){
    throw new Error ("cookie or payload unavailable @ addWebhookController")
}
// getting required webhook
const requiredWebhook = await findWebhookMdb(webhookData,refreshToken)
if (!requiredWebhook){
const hookId = await addWebhookGithub(webhookData, refreshToken);


await addWebhookMdb(webhookData, hookId);

res.status(201).json({ message: "kron added successfully" });
}

else{
    res.status().json({error:"kron already exists"})
}

} 
