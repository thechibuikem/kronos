import {
  collateMetrics,
  getUniqueFiles,
  getRewriteFiles,
  getMessages
} from "../utils/collateMetrics.util.js";

export function getMetrics (commits){
  const totalAdds = collateMetrics(commits, additions);
  const totalDeletes = collateMetrics(commits, deletions);
  const totalChurn = totalAdds + totalDeletes;
  const deletionRatio = totalDeletes / totalChurn;
  const additionRatio = totalAdds / totalChurn;
  const filesChangedCount = getUniqueFiles(commits).size;
  const rewriteCount = getRewriteFiles(commits, 2).length;
  const messages = getMessages(commits)

return {
  totalAdds,
  totalDeletes,
  totalChurn,
  deletionRatio,
  additionRatio,
  filesChangedCount,
  rewriteCount,
  messages,
};
}

export function heuristicEngine(metrics) {
  const {
    totalAdds,
    totalDeletes,
    totalChurn,
    deletionRatio,
    additionRatio,
    filesChangedCount,
    rewriteCount,
    messages,
  } = metrics;

const SEVERITY = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
};

  const flags = [];

  // Rule 1: Heavy deletion/refactor
  if (deletionRatio > 0.6) {
    flags.push({
      pattern: "heavy_deletion",
      severity: SEVERITY.medium,
      reason: `Deleted ${totalDeletes} lines vs added ${totalAdds}. Heavy refactoring.`,
    });
  }

  // Rule 2: File rewrite thrashing
  if (rewriteCount > 3) {
    flags.push({
      pattern: "rewrite_thrashing",
      severity: SEVERITY.high,
      reason: `Touched ${rewriteCount} files multiple times. Unclear intent.`,
    });
  }

  // Rule 3: Massive churn
  if (totalChurn > 500) {
    flags.push({
      pattern: "massive_churn",
      severity: SEVERITY.medium,
      reason: `${totalChurn} total lines changed. Intense session.`,
    });
  }

  // Rule 4: File scatter
  if (filesChangedCount > 10) {
    flags.push({
      pattern: "file_scatter",
      severity: SEVERITY.low,
      reason: `Changed ${filesChangedCount} files. Scattered focus.`,
    });
  }

  // Rule 5: Pure deletion (no addition)
  if (totalAdds < 20 && totalDeletes > 100) {
    flags.push({
      pattern: "pure_deletion",
      severity: SEVERITY.high,
      reason: `Deleted ${totalDeletes} lines, added almost nothing. Cleanup or removal?`,
    });
  }

  return {
    isFlagged: flags.length > 0,
    flags: flags,
    severity:
      flags.length > 0
        ? Math.max(...flags.map((flag) => (flag.severity)))
        : SEVERITY.none, 
  };
}






































