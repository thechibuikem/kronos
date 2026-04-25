import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {

  // 1. Access the header
  const authHeader = req.headers.Authorization;

  //2. Check if auth Header is absent
  if (!authHeader) {
    console.log("No token provided at AuthMiddleWare")
    return res
      .status(401)
      .json({ error: { 
        message: "No token in header at authMiddle-ware",
        code:"REFRESH_TOKEN_UNAVAILABLE"
       } });
  }

  //3. If authHeader starts with the Bearer we set access the authToken
  if (authHeader.startsWith("Bearer ")){
    const token = authHeader.substring(7);//"Strings after the first 7 characters i.e Bearer + White space"
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error:{ message:"Token expired or invalid",
      code:"REFRESH_TOKEN_INVALID"
    } });
    next();
  });
}}
