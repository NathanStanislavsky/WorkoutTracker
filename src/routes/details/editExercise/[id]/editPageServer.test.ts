import "@testing-library/jest-dom";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { load } from "./+page.server";
import { prisma } from "$lib/server/prisma";

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    exercise: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Edit exercise endpoint", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch the exercise in its current state", async () => {
    const params = { id: "1" };
    const locals = { user: { id: 1 } };

    (prisma.exercise.findUnique as any).mockResolvedValue({
      id: 1,
      name: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 100,
    });

    const result = await load({ params, locals });
    expect(result.exercise).toEqual({
      id: 1,
      name: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 100,
    });
  });
});