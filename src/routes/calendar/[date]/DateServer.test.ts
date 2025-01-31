import { describe, it, expect, beforeEach } from "vitest";
import { vi } from "vitest";
import { GET } from "./+server.ts";
import { prisma } from "$lib/server/prisma";

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    workout: {
      findMany: vi.fn(),
    },
  },
}));

describe("GET /api/workouts/[date]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 for an invalid date format", async () => {
    const invalidDate = "invalid-date";
    const requestHandler = GET;

    const context = {
      params: { date: invalidDate },
      locals: { user: { id: "user1" } },
    };

    const response = await requestHandler(context as any);

    expect(prisma.workout.findMany).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Invalid date format" });
  });
});
