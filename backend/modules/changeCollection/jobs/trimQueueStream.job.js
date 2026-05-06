// import cron from "node-cron";
// import { analysisQueue } from "../../../core/queue/analysis.queue.js";

//  async function trimQueueStream() {
//     try{
//         await analysisQueue.client.xtrim("bull:analysis-queue:events", "MAXLEN", "~", 10);
//     }catch(error){
//         console.error("queue stream clearing failed: ",error.message)
//     }
// }

// export function startTrimQueueStreamCron(){
//     cron.schedule("*/3 * * * * ", trimQueueStream)
//     console.log("we just trimmed the queue stream")
// }