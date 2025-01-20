import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./+server";
import { prisma } from "$lib/server/prisma";

describe("POST /login endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error if user not found in the database", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const reqBody = JSON.stringify({
      email: "nonexistent@example.com",
      password: "password"
    });

    const request = new Request("http://localhost/signin", {
      method: "POST",
      body: reqBody
    });

    const response = await POST({ request });
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data).toHaveProperty("error", "Invalid credentials");
  });
});