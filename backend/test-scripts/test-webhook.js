import "dotenv/config";
import crypto from "crypto";

const secret = process.env.WEBHOOK_SECRET;
const url = "http://localhost:5000/api/v1/changeDetection/webhook-data";
const body = JSON.stringify({ test: true });

function sign(key) {
  return (
    "sha256=" + crypto.createHmac("sha256", key).update(body).digest("hex")
  );
}

async function send(label, signature) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-hub-signature-256": signature,
    },
    body,
  });
  console.log(label, res.status);
}

  await send("genuine:", sign(secret));

// await send("forged: ", sign("wrong-secret"));
