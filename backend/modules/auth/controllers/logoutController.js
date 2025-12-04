import { logOutService } from "../services/logoutService.js"


// log out controller gets our refresh cookie that we use to regenerate access token and passes it to logOut service where we used it as a key in our ttl token for session management
export async function logOut(req,res) {
const cookie = req.cookies
const refreshCookie = cookie.refreshToken

console.log(refreshCookie)

try{
    await logOutService(refreshCookie)
}

catch(error){
    console.log("error while using redis clearer func",error)
    }
    finally{
    res.clearCookie("refreshToken",{
        httpOnly: true, // JS cannot access it
        secure: false, // only over HTTPS in production
        sameSite: "Lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }); //clear cookie from front-end
    
      res.sendStatus(200)
    }
}