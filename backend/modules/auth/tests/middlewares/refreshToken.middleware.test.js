import { describe, it, expect, beforeEach, vi } from "vitest";
import jwt from "jsonwebtoken";
import { verifyrefreshToken } from "../../../../core/middlewares/refreshToken.middleware.js";

vi.mock("jsonwebtoken");

describe("verifyrefreshToken", () => {
  let req, res, next;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {
      cookies: {
        refreshToken: "",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it("should reject if no refresh token in cookies", () => {
    // ARRANGE
    req.cookies.refreshToken = undefined;

    // ACT
    verifyrefreshToken(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message: "No refresh token in cookies",
          code: "INVALID_TOKEN",
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject if token is not a string", () => {
    // ARRANGE
    req.cookies.refreshToken = { token: "xyz" };

    // ACT
    verifyrefreshToken(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          code: "INVALID_TOKEN",
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject if token is expired or invalid", () => {
    // ARRANGE
    const token = "expired-token";
    req.cookies.refreshToken = token;
    jwt.verify.mockImplementation((t, secret, callback) => {
      callback(new Error("jwt expired"), null);
    });

    // ACT
    verifyrefreshToken(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message: "Token expired or invalid",
          code: "REFRESH_TOKEN_INVALID",
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    // ARRANGE
    const token = "valid-refresh-token";
    const user = { id: "123" };
    req.cookies.refreshToken = token;
    jwt.verify.mockImplementation((t, secret, callback) => {
      callback(null, user);
    });

    // ACT
    verifyrefreshToken(req, res, next);

    // ASSERT
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should catch and return 500 on unexpected error", () => {
    // ARRANGE
    req.cookies = null; // Trigger error

    // ACT
    verifyrefreshToken(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          code: "REFRESH_TOKEN_FAILED",
        }),
      }),
    );
  });
});
