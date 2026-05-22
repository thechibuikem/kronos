export function getUniqueFiles(commits) {
  const uniqueFiles = new Set();
  commits.forEach((commit) => {
    commit.files.forEach((file) => {
      uniqueFiles.add(file.filename);
    });
  });
  return uniqueFiles;
}

// field = "commit.files.x"
export function collateMetrics(commits, metric) {
  const collatedMetrics = [];

  function getFileMetrics(metric) {
    const totalMetric = commit.files.reduce(
      (sum, file) => sum + (file[metric] || 0),
      0,
    );
    return totalMetric;
  }

  commits.forEach((commit) => {
    const totaladdsPerCommit = getFileMetrics(metric);
    collatedMetrics.push(totaladdsPerCommit);
  });

  const total = collatedMetrics.reduce((sum, value) => sum + value, 0);
  return total;
}

export function countRewriteFiles(commits, count) {
  let uniqueFiles = getUniqueFiles(commits);
  uniqueFiles = [...uniqueFiles];
  let i = 0;
  uniqueFiles.forEach((file, index) => {
    if (file.filename === uniqueFiles[i]) {
    }
  });
}

export function getRewriteFiles(commits, limit) {
  const fileCounts = commits.reduce((acc, commit) => {
    commit.files.forEach((file) => {
      acc[file.filename] = (acc[file.filename] || 0) + 1;
    });
    return acc;
    //{"repos.service.js": 2}
  });

  const result = Object.entries(fileCounts)
    .filter(([_, count]) => count > 2)
    .map(([filename, count]) => ({
      [filename]: count,
    }));

  return result;
}

export function getMessages(commits) {
  const messages = [];
  commits.forEach((commit) => {
    messages.push(commit["message"]);
  });
  return messages;
}

const total = arr.reduce((sum, obj) => sum + obj.price, 0);


