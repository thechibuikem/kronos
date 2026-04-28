import jwt from "jsonwebtoken";

export function verifyrefreshToken(req, res, next) {
  try {
    // .1 get GitHub's signature from header
    const refreshToken = req.cookies.refreshToken

  if (!refreshToken || typeof refreshToken !== "string")
    return res
      .status(401)
      .json({
        error: {
          message: "No refresh token in cookies",
          code: "INVALID_TOKEN",
        },
      });

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
     if (err)
       return res
         .status(401)
         .json({
           error: {
             message: "Token expired or invalid",
             code: "REFRESH_TOKEN_INVALID",
           },
         });
     next();
   });
   
  } catch (error) {
        console.error("Oauth Error:", error);
        return res.status(500).json({
          error: {
            message: "refresh token failed",
            code: "REFRESH_TOKEN_FAILED",
          },
        });
  }
}
