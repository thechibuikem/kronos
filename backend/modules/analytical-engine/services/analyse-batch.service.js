import {
  collateMetrics,
  getUniqueFiles,
} from "../utils/collateMetrics.util.js";

export function analyseBatchService (commits){
const totalAdds = collateMetrics(commits, additions);
const totalDeletes = collateMetrics(commits, deletions);
const totalChurn = totalAdds + totalDeletes
const deletionRatio = totalDeletes/totalChurn
const additionRatio = totalAdds/totalChurn
const filesChangedCount = getUniqueFiles(commits).size;




}



// const metrics = {
//   totalAdds: sum of all additions,
//   totalDeletes: sum of all deletions,
//   deletionRatio: totalDeletes / totalAdds,
//   filesChanged: count of unique filenames,
//   rewriteCount: count of files touched 2+ times,
//   totalChurn: totalAdds + totalDeletes,
//   messages: array of commit messages
// }

// const thresholds = {
//   deletionRatio: > 1.5,    // heavy deletion/refactor
//   rewriteCount: > 3        // file touched 4+ times = unclear intent
// }