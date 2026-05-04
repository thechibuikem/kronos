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



    try {
      console.log("Attempting to queue:", {
        userID,
        commitCount: commitObjects.length,
        firstCommit: commitObjects[0],
      });

      await analysisQueue.add({
        userID,
        commits: commitObjects,
      });

      console.log("✓ Successfully queued");
    } catch (err) {
      console.error("✗ Queue.add() failed:", err.message);
      console.error("Full error:", err);
    }

  }
}

export function startCollectChangesCron() {
  cron.schedule("*/3 * * * *", collectChanges);
}