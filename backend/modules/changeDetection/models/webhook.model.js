import mongoose from "mongoose";

// 1. our schema for storing webhooks
const webhookSchema = new mongoose.Schema(
    {
        githubHookId: {type:String},
        repo:{type:String},
        githubOwnerId: {type:String}
}
)

// 2. creating a model from our schema
export const webhookModel = mongoose.model("Webhook",webhookSchema)