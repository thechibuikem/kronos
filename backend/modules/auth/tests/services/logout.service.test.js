import { describe, it, expect, beforeEach, vi } from "vitest";
import { redisClient } from "../../../../core/redis.client.js";
import { logOutService } from "../../services/logout.service.js";

vi.mock("../../../../core/redis.client.js")

describe("logOutService", () => {

    beforeEach(() => {
        vi.clearAllMocks();
         });

    it("should delete redis-refresh-token", async () => {

       const refreshToken = "fake_token_xyz";


       vi.mocked(redisClient.del).mockResolvedValue(1);

       await logOutService(refreshToken);

       expect(redisClient.del).toHaveBeenCalledWith(refreshToken);

 })

   // Internal server error
    
   it("throw error if redis is down", async () => {
       const refreshToken = "fake_token_xyz";

       vi.mocked(redisClient.del).mockRejectedValue(new Error("Redis down"));
 
        await expect(logOutService(refreshToken)).rejects.toThrow("Redis down");

        expect(redisClient.del).toHaveBeenCalledWith(refreshToken);
     });
   });
























