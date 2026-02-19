import { webHookService } from "../service/changeDetection.service.js";
import { addWebHook } from "../service/changeDetection.service.js";



// this controller would be mounted at the webhook 
export async function webHookController(req, res) {
const data = req.body
// const refreshToken = req.cookies.refreshToken;
webHookService(data)
}

// controller to add a webHook 
// export async function addWebHookController (req, res) {
// const refreshToken = res.cookies.refreshToken;
// const webHookData = res.data.refreshToken;

// addWebHook(refreshToken)
// }

