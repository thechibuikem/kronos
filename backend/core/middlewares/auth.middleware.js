import jwt from "jsonwebtoken";

export default function bearerMiddleware(req, res, next) {

  try{
 // 1. Access the header
console.error(req.headers)   
  const authHeader = req.headers.authorization;

  //2. Check if auth Header is absent
  if (!authHeader || typeof authHeader !== "string") {
    console.error("No token provided at AuthMiddleWare")
    return res
      .status(401)
      .json({ error: { 
        message: "No token in header at authMiddle-ware",
        code:"ACCESS_TOKEN_UNAVAILABLE"
       } });
  }

  //3. If authHeader starts with the Bearer we set access the authToken
  if (authHeader.startsWith("Bearer ")){
    const token = authHeader.substring(7)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error:{ message:"Token expired or invalid",
      code:"ACCESS_TOKEN_INVALID"
    } });
    next();
  });
}}

  catch(error){
          console.error("Oauth Error:", error);
          return res.status(500).json({
            error: {
              message: "access token failed",
              code: "ACCESS_TOKEN_FAILED",
            },
          });
  }
}