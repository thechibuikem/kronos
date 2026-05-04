import cron from "node-cron";
import { redisClient } from "../../../core/redis.client.js";
import { analysisQueue } from "../../../core/queue/analysis.queue.js";

export async function collectChanges() {
  // Get all user keys from Redis
  const keys = await redisClient.keys("kron:*:commits");

  for (const key of keys) {
    // Extract userID from key
    const userID = key.split(":")[1];

    // Fetch all commits for this user
    const commits = await redisClient.lRange(key, 0, -1);

    if (commits.length === 0) continue;

    // Parse commits back to objects
    const commitObjects = commits.map((commit) => JSON.parse(commit));

    console.log(
      "About to queue:",
      JSON.stringify({ userID, commits: commitObjects }),
  );

    // Queue analysis job
    await analysisQueue.add({
      userID,
      commits: commitObjects,
    });
  }
}

export function startCollectChangesCron() {
  cron.schedule("*/3 * * * *", collectChanges);
}