import { describe, it, expect, beforeEach, vi } from "vitest"
import { refreshTokenService } from "../../services/refreshToken.service.js"
import { generateAccessToken } from "../../controllers/refreshToken.controller.js"

vi.mock("../../services/refreshToken.service.js");

describe("generateAccessTokenController",()=>{
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {
      cookies: { refreshToken: "fake_refresh_token_xyz" },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

it("should send access token and return 200, on success",async()=>{
    // ARRANGE
    const result = {
    data:{
    message:"some-random-string",
    accessToken:"some-random-string"
    }}
    refreshTokenService.mockResolvedValue(result)
    // ACT
    await generateAccessToken(req,res)
    //ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({data:{accessToken:result.data.accessToken}});
})

it("should return 401, on result error", async () => {
  // ARRANGE
  const result = {
    error: {
      message: "invalid Refresh token",
    },
  };
  refreshTokenService.mockResolvedValue(result);
  // ACT
  await generateAccessToken(req, res);
  //ASSERT
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    error: {
      message: result.error.message,
      code: "TOKEN_GENERATION_FAILED",
    },
  });
});


  // Internal server error
  it("return 500 if internal server error", async () => {
    // MOCK: pretend the service works
    refreshTokenService.mockRejectedValue(new Error("fail"));

    // ACT: call the real controller
    await generateAccessToken(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "refresh token failed",
        code: "REFRESH_TOKEN_FAILED",
      },
    });
  });

})
