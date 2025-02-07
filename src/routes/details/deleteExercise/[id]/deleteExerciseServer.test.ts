import { describe, it, expect, vi, beforeEach } from "vitest";
import { DELETE } from "./+server";

describe("delete exercise endpoint tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should check if user jwt exists (user is logged in)", async () => {
    const locals = { user: null };

    await expect(DELETE({ locals } as any)).rejects.toMatchObject({
      status: 401,
      body: { message: "Unauthorized" }
    });
  });
});