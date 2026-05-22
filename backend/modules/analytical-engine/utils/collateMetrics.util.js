// export function countUniqueFiles(commits) {
// const records = [];
// let counter = 0;
// commits.forEach(commit =>{
    
// while(counter < commits.length && counter < records.length){
// commit.files.forEach((file) => {
//   if (file.filename === records[counter]) {
//     counter++;
//   } else if (file[filename] !== records[counter]) {
//     records.push(file[filename]);
//     counter++;
//   }
// });
// }
// })
// }



export function getUniqueFiles(commits){
    const uniqueFiles = new Set()
    commits.forEach(commit => {
        commit.files.forEach(file=>{
            uniqueFiles.add(file.filename)
        })
    })
    return uniqueFiles
}


// field = "commit.files.x"
export function collateMetrics(commits,metric){
const collatedMetrics = [];

function getFileMetrics(metric) {
  const totalMetric = commit.files.reduce(
    (sum, file) => sum + (file[metric] || 0),
    0,
  );
  return totalMetric;
}

commits.forEach(commit => {
   const totaladdsPerCommit = getFileMetrics(metric);
   collatedMetrics.push(totaladdsPerCommit);
});

const total = collatedMetrics.reduce((sum, value) => sum + value, 0);   
return total
}






export function countRewriteFiles(commits,count){
let uniqueFiles = getUniqueFiles(commits)
uniqueFiles = [...uniqueFiles]
let i = 0
uniqueFiles.forEach((file,index) =>{

if(file.filename === uniqueFiles[i]){

}

} 

)}




const commits = [
  /* your array */
];

const fileCounts = commits.reduce((acc, commit) => {
  commit.files.forEach((file) => {
    acc[file.filename] = (acc[file.filename] || 0) + 1;
  });

  return acc;
}, {});

const result = Object.entries(fileCounts)
  .filter(([_, count]) => count > 2)
  .map(([filename, count]) => ({
    [filename]: count,
  }));

console.log(result);



































const total = arr.reduce((sum, obj) => sum + obj.price, 0);

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