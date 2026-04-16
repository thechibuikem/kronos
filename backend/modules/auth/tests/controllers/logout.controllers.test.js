import { describe, it, expect, beforeEach, vi } from "vitest"
import { logOutService } from "../../services/logoutService.js";

vi.mock("../../services/logoutService.js");

describe('logOutController', () => {
  let req, res;

  beforeEach(() => {
    //ARRANGE
    req = {
      cookies: { refreshToken: "fake_refresh_token_xyz" },
    };
    res = {
      clearCookie: vi.fn(),
      sendStatus: vi.fn(),
    };
  });

  // Happy path: valid token, logout succeeds
  it("should clear cookie and return 200 on success", async () => {
    // MOCK: pretend the service works
    logOutService.mockResolvedValue(undefined);

    // ACT: call the real controller
    await logOut(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "Lax",
      }),
    );
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });








  
//   Should return 500, if error occurs.
expect(res.sendStatus).toHaveBeenCalledWith(500)


  });










