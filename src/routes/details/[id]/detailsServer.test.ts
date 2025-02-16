import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "$lib/server/prisma";
import { load } from "./+page.server";

vi.mock("$lib/Server/prisma.ts", () => ({
  prisma: {
    workout: {
      findFirst: vi.fn(),
    },
    exercise: {
      findMany: vi.fn(),
    },
  },
}));

describe("Exercise loader", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("if user does not exist, returns an empty workout array", async () => {
    const locals = { user: null };

    const result = await load({ locals });

    expect(result).toEqual({ exercises: [] });
  });

  it("if workout does not exist throw error", async () => {
    const locals = { user: { id: 1 } };
    const params = { workoutId: "non-existent-id" };

    prisma.workout.findFirst.mockResolvedValue(null);

    await expect(load({ locals, params })).rejects.toThrow("Workout not found");
  });

  it("if workout exists, fetches exercises for that workout", async () => {
    const locals = { user: { id: 1 } };
    const params = { id: 1 };

    prisma.workout.findFirst.mockResolvedValue({
      id: 1,
      exercises: [
        { id: "exercise-id-1", name: "exercise 1" },
        { id: "exercise-id-2", name: "exercise 2" },
      ]
    });

    const result = await load({ locals, params });

    expect(result).toEqual({
      exercises: [
        { id: "exercise-id-1", name: "exercise 1" },
        { id: "exercise-id-2", name: "exercise 2" },
      ],
    });
  });
});
