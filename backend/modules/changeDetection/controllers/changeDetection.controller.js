import {
  addWebhookGithub,
  addWebhookMdb,
  findWebhookMdb,
  removeWebhookGithub,
  removeWebhookMdb,
} from "../services/changeDetection.service.js";

import {
  getWebhookData,
} from "../services/getWebhookData.service.js";


// controller to read webhook data
export async function webhookDataController(req, res) {
  try{
  const data = req.body;
  if (!data){
    throw new Error("webhook data @ webhook data controller");
  }
  const webhookData = await getWebhookData(data);

  console.log(
    "\nwebhook metrics: ",
    JSON.stringify(webhookData,null,2),

  );
  res.status(204).send
  }
catch(error){
  
res.status(500).send
console.error(error)
throw new Error("error at webhook data controller",error)
}
}

export async function removeWebhookController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { repoId } = req.params;

    if (!repoId) {
      throw new Error("cookie, param DNE @ remove webhook");
    }
    await removeWebhookGithub(repoId, refreshToken);
    await removeWebhookMdb(repoId, refreshToken);
    res.status(204).send();
  } catch (err) {
       console.error("webhook deletion controller", error);
       res.status(500).json({
         error: {
           message: "Failed to remove webhook",
           code: "DELETE_WEBHOOK_FAILED",
         },
       });
  }
}

export async function addWebhookController(req, res) {
  try {
    // .1 get payload and cookie
    const { webhookData } = req.body;
    const refreshToken = req.cookies.refreshToken;

    // ,2 validate payload and cookie
    if (!webhookData) {
      throw new Error("payload unavailable at addWebhookController");
    }

    // .3 validate kronos isn't already watching
    const requiredWebhook = await findWebhookMdb(
      webhookData.repo,
      refreshToken,
    );
    if (!requiredWebhook) {
      const hookId = await addWebhookGithub(webhookData, refreshToken);

      // .5 keep track of our watcher webhook @ mdb
      await addWebhookMdb(refreshToken, webhookData, hookId);

      //.6 alert client on success
      res.status(201).json({
        data:{ 
          message: "kron added successfully" 
        }
      });
    }
    // .7
    else {
     console.error("webhhook already exists");
      res.status(409).json({
        error: {
          message: "Failed to add webhook",
          code: "ADD_WEBHOOK_FAILED",
        },
      });


    }
  } catch (error) {
     console.error("webhook addition controller", error);
         res.status(500).json({
           error: {
             message: "Failed to add webhook",
             code: "ADD_WEBHOOK_FAILED",
           },
         });
  }
}
