import { redisClient } from "../../../core/redis.client.js";

export async function storeCommitBatch(commits) {
  const key = `kron:${commits.userId}:commits`;

  // Store each commit as JSON string
  for (const commit of commits) {
    await client.lPush(key, JSON.stringify(commit));
  }
}
