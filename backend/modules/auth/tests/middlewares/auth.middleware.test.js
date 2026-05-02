import { describe, it, expect, beforeEach, vi } from "vitest";
import jwt from "jsonwebtoken";
import bearerMiddleware from "../../../../core/middlewares/auth.middleware.js";

vi.mock("jsonwebtoken");

describe("bearerMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {
      headers: {
        authorization: "",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it("should reject if no auth header", () => {
    // ARRANGE
    req.headers.authorization = undefined;

    // ACT
    bearerMiddleware(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message: expect.stringContaining("No token"),
          code: "ACCESS_TOKEN_UNAVAILABLE",
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject if header is not a string", () => {
    req.headers.authorization = { token: "xyz" };

    bearerMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject if token is invalid or expired", () => {
    // ARRANGE
    const token = "valid-format-token";
    req.headers.authorization = `Bearer ${token}`;
    jwt.verify.mockImplementation((t, secret, callback) => {
      callback(new Error("jwt malformed"), null);
    });

    // ACT
    bearerMiddleware(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          code: "ACCESS_TOKEN_INVALID",
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    // ARRANGE
    const token = "valid-token";
    const user = { id: "123" };
    req.headers.authorization = `Bearer ${token}`;
    jwt.verify.mockImplementation((t, secret, callback) => {
      callback(null, user);
    });

    // ACT
    bearerMiddleware(req, res, next);

    // ASSERT
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should catch and return 500 on unexpected error", () => {
    // ARRANGE
    req.headers = null; // Trigger error in try block

    // ACT
    bearerMiddleware(req, res, next);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          code: "ACCESS_TOKEN_FAILED",
        }),
      }),
    );
  });
});