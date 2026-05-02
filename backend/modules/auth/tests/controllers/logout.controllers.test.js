import { describe, it, expect, beforeEach, vi } from "vitest";
import { logOutService } from "../../services/logout.service.js";
import { logOut } from "../../controllers/logout.controller.js";

vi.mock("../../services/logout.service.js");

describe("logOutController", () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {
      cookies: { refreshToken: "fake_refresh_token_xyz" },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      clearCookie: vi.fn(),
      sendStatus: vi.fn(),
    };
  });

  // Happy path: valid token, logout succeeds
  it("should clear cookie and return 204, on success", async () => {
    // MOCK: pretend the service works
    logOutService.mockResolvedValue(undefined);

    // ACT: call the real controller
    await logOut(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith(
      "refreshToken",
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }),
    );
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });



  // Internal server error
  it("return 500 if internal server error", async () => {
    // MOCK: pretend the service works
    logOutService.mockRejectedValue(new Error("fail"));

    // ACT: call the real controller
    await logOut(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "LOGOUT FAILED",
        code: "LOGOUT_FAILED",
      },
    });
  });
});
