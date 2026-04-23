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
   it("return 500 if internal server error", async () => {
     // MOCK: pretend the service works
     await redisClient.del.mockRejectedValue(new Error("fail"));
 

 

     });
   });


















