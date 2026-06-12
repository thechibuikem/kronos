import { redisClient } from "../../../core/redis.client.js";

export async function storeCommitBatch(commits) {
  const key = `kron:${commits[0].userId}:commits`;

  // Store each commit as JSON string
  for (const commit of commits) {
    await redisClient.lPush(key, JSON.stringify(commit));
  }
}

// export async function storeCommitBatch(commits) {
//   const userId = commits[0].userId;
//   const KronIdSet = new Set();
//   commits.forEach((commit) => {
//     KronIdSet.add(commit.kronId);
//   });
//   const kronIdArray = [...KronIdSet];
//   // Store each commit as JSON string
//   for (const commit of commits) {
//     await redisClient.lPush(key, JSON.stringify(commit));
//   }

//   const key = `kron:${commits[0].userId}:${kronId}:commits`;
// }


// export async function storeCommitBatch(commits) {
//   const key = `kron:${commits[0].userId}:commits`;

//   // Store each commit as JSON string
//   for (const commit of commits) {
//     await redisClient.lPush(key, JSON.stringify(commit));
//   }
// }

export async function storeCommitBatch(commits) {
  const key = `kron:${commits[0].userId}:${commits[0].kronId}:commits`;

  // Store each commit as JSON string
  for (const commit of commits) {
    await redisClient.lPush(key, JSON.stringify(commit));
  }
}