import { webHookService } from "../service/changeDetection.service.js";
import { addWebHook } from "../service/changeDetection.service.js";



// this controller would be mounted at the webhook 
export async function webHookController(req, res) {
const data = req.body
// const refreshToken = req.cookies.refreshToken;
webHookService(data)
}

