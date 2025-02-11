import "@testing-library/jest-dom";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { load } from "./+page.server";
import { prisma } from "$lib/server/prisma";
import { mock } from "node:test";

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    exercise: {
      findUnique: vi.fn(),
    },
  },
}));

const mockExercise = {
  id: 1,
  name: "Bench Press",
  sets: 3,
  reps: 10,
  weight: 100,
};

describe("Edit exercise endpoint", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch the exercise in its current state", async () => {
    const params = { id: "1" };
    const locals = { user: { id: 1 } };

    (prisma.exercise.findUnique as any).mockResolvedValue({
      mockExercise
    });

    const result = await load({ params, locals });
    expect(result.exercise).toEqual({
      mockExercise
    });
  });
});
