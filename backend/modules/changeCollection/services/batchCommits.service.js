import { redisClient } from "../../../core/redis.client.js";

export async function storeCommitBatch(commits) {
  // Store each commit as JSON string
  try {
    const key = `kron:${commits[0].userId}:${commits[0].kronId}:commits`;
    for (const commit of commits) {
      await redisClient.lPush(key, JSON.stringify(commit));
    }
  } catch (error) {
    throw new Error(`unexpected error ${error}`);
  }
}
