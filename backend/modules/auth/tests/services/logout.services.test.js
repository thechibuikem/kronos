import { describe, it, expect, beforeEach, vi } from "vitest";
import { redisClient } from "../../../../core/redis.client.js";
import { logOutService } from "../../services/logoutService.js";

vi.mock("../../../../core/redis.client.js")

describe("logOutService", () => {
  let refreshToken;

    it("should delete redis-refresh-token", async () => {

    await redisClient.del.mockResolvedValue(undefined)

 })

   // Internal server error
    
   it("throw error if redis is doown", async () => {


    await redisClient.del.mockRejectedValue(new Error("fail"));
 

     });
   });


















