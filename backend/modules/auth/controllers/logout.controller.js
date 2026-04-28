import { logOutService } from "../services/logout.service.js";

// passes refresh cookie to logOut service where we used it as a key in our TTL token for session management
export async function logOut(req, res) {
  const refreshToken = req.cookies?.refreshToken;

  try {
    await logOutService(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    return res.sendStatus(204)
  } 
  catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json(
      { "error": {
          "message":"LOGOUT FAILED",
          "code":"LOGOUT_FAILED"
      } }
    );
  }
}   