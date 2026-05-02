import { describe, it, expect, beforeEach, vi } from "vitest";

import { githubOauthService,githubTokenService } from "../../services/oauth.service.js";

import { githubOauth,githubCallback } from "../../controllers/oauth.controller.js";
import { GEO_REPLY_WITH } from "redis";

vi.mock("../../services/oauth.service.js");

describe("githubOauth",()=>{
    let req, res;
    
    beforeEach(()=>{
    vi.clearAllMocks();
    req={}
    res = {
        redirect: vi.fn(),
    };
    
})


it("should redirect to url on success",() => {
    //ARRANGE
    const mockUrl = "https://github.com/login/oauth/authorize?client_id=...";
    githubOauthService.mockReturnValue(mockUrl);

    // ACT
    githubOauth(req, res);

    // ASSERT
    expect(res.redirect).toHaveBeenCalledWith(mockUrl);

})

it("should return 500 on error",()=>{
    // ARRANGE
    githubOauthService.mockImplementation(() => {
        throw new Error("Service down");
    });

    res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    };
    // ACT
    githubOauth(req, res);

    // ASSERT
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: {
      message: "oAuth initialization failed",
      code: "OAUTH_INIT_FAILED",
    },
  });
})

})


























describe("githubCallback",()=>{
  let req, res;
beforeEach(()=>{
        vi.clearAllMocks();
        req = {
            code:"some-random-string"
        };
        res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    };
    
})


it("should return 400, if code is unavailable",()=>{
    // ARRANGE
    req.query = {}

    // ACT
     githubCallback(req,res);

    // ASSERT
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
        error: {
            message: "OAuth authentication failed",
            code: "OAUTH_FLOW_FAILED",
        },
        });

})    




  // Happy path: valid token, logout succeeds
  it("should send cookie and return 200 on success", async () => {

  req = { query: { code: "code_123" } };
  res = {
    cookie: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    redirect: vi.fn(),
  };

  const mockResult = {
    status: 200,
    data: {
      refreshToken: "refresh_xyz",
      accessToken: "access_xyz",
    },
    redirectUrl: "https://frontend.com/dashboard?token=xyz",
  };

    // MOCK: pretend the service works
    githubTokenService.mockResolvedValue(mockResult);



    // ACT: call the real controller
    await githubCallback(req, res);

    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",mockResult.data.refreshToken,
      expect.objectContaining({
        httpOnly: true,
        // secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.redirect).toHaveBeenCalledWith(mockResult.redirectUrl)
  });




















})