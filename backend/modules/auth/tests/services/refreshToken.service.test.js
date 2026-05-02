import { describe, it, expect, beforeEach, vi } from "vitest";
import { getRefreshTokenFromRedis } from "../../../../core/redis.client.js";
import jwt from "jsonwebtoken"
import { refreshTokenService } from "../../services/refreshToken.service.js";

vi.mock("../../../../core/redis.client.js")
vi.mock("jsonwebtoken");

describe("refreshTokenService", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

it ("happy-path, should return access token if a storedUserId",async()=>{
// ARRANGE
const storedUserId = "some-random-string"
const accessToken = "some-random-string";
// ACT
getRefreshTokenFromRedis.mockResolvedValue(storedUserId);
jwt.sign.mockResolvedValue(accessToken);
const result = await refreshTokenService("cookie-xyz")
// ASSERT
expect(result.data.message).toContain("successfully");
// expect(result.data.accessToken).toContain(accessToken);
})


it("should return error, if no storedUserId", async () => {
  // ARRANGE
const error = {
  error: {
    message: "invalid Refresh token",
  },
};
  // ACT
  getRefreshTokenFromRedis.mockResolvedValue(null);
  const result = await refreshTokenService("cookie-xyz");
  // ASSERT
  expect(result.error.message).toContain("invalid");
  // expect(result.data.accessToken).toContain(accessToken);
});
















});