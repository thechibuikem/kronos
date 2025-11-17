import { logOutService } from "../services/logoutService.js"

export async function logOut(res,req) {
const cookie = req.cookies
const refreshCookie = cookie.refreshToken

try{
    await logOutService(refreshCookie)
}

catch(error){
    console.log("error while using redis clearer func",error)
    }
    finally{
      res.sendStatus(204).clearCookie("refreshToken") //clear cookie from front-end
    }
}