import { refreshTokenService } from "../services/refreshTokenService.js";

export async function checkToken(req,res) {

  try{
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token in cookies" });
  // refresh token service
  const result = await refreshTokenService(refreshToken);

const responseBody = {}
// preparing my response body
if (result.data.accessToken){
  responseBody.accessToken = result.data.accessToken
}

  //  sending my message containing accessToken as a response if everything goes right
  if (result.status == 200) {
     res.status(result.status).json(responseBody);

  } else if (result.status == 401) {
    return res.json(result.error);
  }

    }
    catch(error){
        res.json({error:`${error}`})
    }

  

}