import {
  addWebhookGithub,
  addWebhookMdb,
  findWebhookMdb,
  removeWebhookGithub,
  removeWebhookMdb,
} from "../services/changeDetection.service.js";

import {
  getFileBasedWebhookData,
  getLineBasedWebhookData,
} from "../services/getWebhookData.service.js";


// controller to read webhook data
export async function webhookDataController(req, res) {
  const data = req.body;
  if (!data){
    throw new Error("webhook data @ webhook data controller");
  }
  // const fileBasedWebhookData = getFileBasedWebhookData(data);
  const lineBasedWebhookData = await getLineBasedWebhookData(data);

  console.log(
    "\n\nlineBasedWebhookData: ",
    JSON.stringify(lineBasedWebhookData,null,2),

    // JSON.stringify(fileBasedWebhookData,null,2),
  );
}

export async function removeWebhookController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { repoId } = req.params;
    // const {webhookData} = req.body

    if (!refreshToken || !repoId) {
      throw new Error("cookie, param DNE @ remove webhook");
    }

    console.log("starting process of removing webhooks")
    await removeWebhookGithub(repoId, refreshToken);
    await removeWebhookMdb(repoId, refreshToken);
    res.status(204).send();
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message });
  }
}

export async function addWebhookController(req, res) {
  try {
    // .1 get payload and cookie
    const { webhookData } = req.body;
    const refreshToken = req.cookies.refreshToken;

    // ,2 validate payload and cookie
    if (!refreshToken || !webhookData) {
      throw new Error("cookie or payload unavailable @ addWebhookController");
    }

    // .3 validate kronos isn't already watching
    const requiredWebhook = await findWebhookMdb(
      webhookData.repo,
      refreshToken,
    );
    if (!requiredWebhook) {
      // .4 watch kron & hold hookId
      const hookId = await addWebhookGithub(webhookData, refreshToken);

      // .5 keep track of our watcher webhook @ mdb
      await addWebhookMdb(refreshToken, webhookData, hookId);

      //.6 alert client on success
      res.status(201).json({ message: "kron added successfully" });
    }
    // .7
    else {
      res.status(409).json({ error: "kron already exists" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
