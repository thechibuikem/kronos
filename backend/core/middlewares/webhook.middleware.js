import crypto from "crypto";

export function verifyWebhookSignature(req, res, next) {
  try {
    // .1 get GitHub's signature from header
    const signature = req.headers["x-hub-signature-256"];
    if (!signature) {
      return res.status(401).json({ error: "No signature provided" });
    }

    // .2 compute your own hash using raw body + secret
    const computedHash = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest("hex");

    // .3 format it the same way GitHub formats theirs
    const computedSignature = `sha256=${computedHash}`;

    // .4 constant time comparison - prevents timing attacks
    const trusted = Buffer.from(signature);
    const computed = Buffer.from(computedSignature);

    if (
      trusted.length !== computed.length ||
      !crypto.timingSafeEqual(trusted, computed)
    ) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Signature verification failed" });
  }
}
