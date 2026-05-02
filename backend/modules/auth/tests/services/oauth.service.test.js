import { describe, it, expect, beforeEach, vi } from "vitest";
import { githubTokenService } from "../../services/oauth.service.js";
import { addOauthUser } from "../../utils/addOauthUser.js";
import { getUrls } from "../../../../core/config.js";
import { githubOauthService } from "../../services/oauth.service.js";
vi.mock("../../utils/addOauthUser.js");
vi.mock("../../../../core/config.js");
global.fetch = vi.fn();



describe("githubTokenService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return redirectUrl and user data on success", async () => {
    // ARRANGE

    // mock frontend and backend url
    getUrls.mockReturnValue({
      frontendUrl: "https://frontend.com",
    });

    // mock github token endpoint
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: "token_xyz" }),
    });
    // mock github user endpoint
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 123, login: "user" }),
    });
    // mock github emails endpoint
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { email: "test@test.com", primary: true, verified: true },
      ],
    });
    // mock addOauthUser
    addOauthUser.mockResolvedValue({
      status: 200,
      data: { accessToken: "access_xyz", refreshToken: "refresh_xyz" },
    });

    // ACT
    const result = await githubTokenService("code_123");

    // ASSERT
    expect(result.redirectUrl).toContain("dashboard?token=");
    expect(result.status).toBe(200);
  });

  it("should throw if token request fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => "error",
    });

    await expect(githubTokenService("code_123")).rejects.toThrow(
      "Github Token Request Failed",
    );
  });
});




describe("githubOauthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GITHUB_CLIENT_ID = "test_client_id";
  });

  it("should return github oauth url with correct params", () => {
    // ARRANGE

    getUrls.mockReturnValue({
      backendUrl: "https://backend.com",
    });

    // ACT
    const url = githubOauthService();

    // ASSERT
    expect(url).toContain("https://github.com/login/oauth/authorize");
    expect(url).toContain("client_id=test_client_id");
    expect(url).toContain(
      "redirect_uri=https://backend.com/api/v1/auth/github/callback",
    );
    expect(url).toContain("scope=user:email,repo");
  });
});


