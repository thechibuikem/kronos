import mongoose from "mongoose";

// 1. our schema for storing webhooks
const webhookSchema = new mongoose.Schema(
    {
        githubHookId: {type:string},
        repo:{type:string},
        githubOwnerId: {type:string}
}
)

// 2. creating a model from our schema
export const webhookModel = mongoose.model("Webhook",webhookSchema)