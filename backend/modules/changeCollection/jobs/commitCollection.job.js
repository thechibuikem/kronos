import cron from "node-cron";
import { redisClient } from "../../../core/redis.client.js";
import { analysisQueue } from "../../../core/queue/analysis.queue.js";

export async function collectChanges() {
  // Get all user keys from Redis
  const keys = await redisClient.keys("kron:*:commits");

  for (const key of keys) {
    // Extract userID from key
    const userId = key.split(":")[1];

    // Fetch all commits for this user
    const commits = await redisClient.lRange(key, 0, -1);

    if (commits.length === 0) continue;

    // Parse commits back to objects
    const commitObjects = commits.map((commit) => JSON.parse(commit));


      const jobData = {
      userId,
      commits: commitObjects,
    };

    // Verify it's JSON-serializable
    try {
      JSON.stringify(jobData);
    } catch (e) {
      console.error("Job data not serializable:", e);
      continue;
    }



    try {
    
      console.log("Attempting to queue:", {
        userId,
        commitCount: commitObjects.length,
        firstCommit: commitObjects[0],
      });


    // const stringifiedJobData = JSON.stringify(jobData)
    await analysisQueue.add("analyze", jobData);
    console.log("✓ Successfully queued");
    } catch (error) {
      console.error("✗ Queue.add() failed:", error.message);
    }

  }
}

export function startCollectChangesCron() {
  cron.schedule("0 */6 * * *", collectChanges);
}