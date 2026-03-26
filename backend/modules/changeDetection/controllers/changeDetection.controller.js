import {
  addWebhookMdb,
  findWebhookMdb,
  getWebhookData,
  removeWebhookGithub,
  removeWebhookMdb,
} from "../services/changeDetection.service.js";
import { addWebhookGithub } from "../services/changeDetection.service.js";
import { removeWebhook } from "../services/changeDetection.service.js";

// this controller would be mounted at the webhook
export async function webhookDataController(req, res) {
  const data = req.body;
  // const refreshToken = req.cookies.refreshToken;
  getWebhookData(data);
}

export async function removeWebhookController(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { repoId } = req.params;
    // const {webhookData} = req.body

    if (!refreshToken || !repoId) {
      throw new Error("cookie, param DNE @ remove webhook");
    }

    await removeWebhookGithub(repoId, refreshToken);

    await removeWebhookMdb(repoId, refreshToken);
    res.status(204).send();
  } catch (err) {
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
