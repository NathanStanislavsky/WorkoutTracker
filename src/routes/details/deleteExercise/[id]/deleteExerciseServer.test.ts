import { describe, it, expect, vi, beforeEach } from "vitest";
import { DELETE } from "./+server";

describe("delete exercise endpoint tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should check if user jwt exists (user is logged in)", async () => {
    const locals = { user: null };
    const params = { id: '1' };

    await expect(DELETE({ params, locals } as any)).rejects.toMatchObject({
      status: 401,
      body: { message: "Unauthorized" }
    });
  });

  it('should check if exercise ID is valid', async () => {
    const locals = { user: { id: 1 }};
    const params = { id: '' };

    await expect(DELETE({ params, locals } as any)).rejects.toMatchObject({
      status: 400,
      body: { message: 'Invalid exercise ID' }
    });
  });
});