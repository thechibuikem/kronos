 [
  {
    "id": "ce948d6043333b2b91ba604379c7f06b140873e4",
    "message": "cleaning up metrics collection",
    "timestamp": "2026-04-09T13:33:57+01:00",
    "author": "thechibuikem",
    "files": [
      {
        "filename": "backend/modules/changeDetection/services/getWebhookData.service.js",
        "additions": 54,
        "deletions": 191,
        "changes": 245
      }
    ]
  },
  {
    "id": "0ce03f6c9d8f400199566ccfe6b6462d534c38ea",
    "message": "cleaning up metrics collection",
    "timestamp": "2026-04-09T13:36:03+01:00",
    "author": "thechibuikem",
    "files": [
      {
        "filename": "backend/modules/changeDetection/controllers/changeDetection.controller.js",
        "additions": 2,
        "deletions": 2,
        "changes": 4
      }
    ]
  }
]







import mongoose, { mongo } from "mongoose"


const filesShema = new mongoose.Schema(
    {
        filename: {type:String},
        additions : {type: number},
        deletions : {type: number},
        changes : {type: number},
    }
)

const commitSchema = new mongoose.Schema({
sha:{type:number},
message: {type:String},
timestamp:{type:String},
files:{type:[filesShema]}
})

const pushSchema = new mongoose.Schema({
    githubUserId: {type:String},
    timestamp:{type: String},
    commits: {type:[commitSchema]}
})  