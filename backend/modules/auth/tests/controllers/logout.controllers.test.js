import { describe, it, expect, beforeEach, vi } from "vitest";
import { logOutService } from "../../services/logoutService.js";
import { logOut } from "../../controllers/logoutController.js";

vi.mock("../../services/logoutService.js");

describe("logOutController", () => {
  let req, res;

  beforeEach(() => {
    //ARRANGE
    req = {
      cookies: { refreshToken: "fake_refresh_token_xyz" },
    };
    res = {
      status: vi.fn().mockReturnValue(res),
      json: vi.fn(),
      clearCookie: vi.fn(),
      sendStatus: vi.fn(),
    };
  });

  // Happy path: valid token, logout succeeds
  it("should clear cookie and return 204 on success", async () => {
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

  // No refresh-token detected
  it("return 400 if no refresh-token", async () => {
    req.cookies = {};

    // ACT: call the real controller
    await logOut(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "LOGOUT FAILED",
        code: "USER_FORBIDDEN",
      },
    });
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
