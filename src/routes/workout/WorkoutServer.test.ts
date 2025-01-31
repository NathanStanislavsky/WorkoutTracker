import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "$lib/server/prisma";
import { load } from "./+page.server";

describe("load function for workout page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("if user does not exist, returns an empty workout array", async () => {
    const locals = { user: null };

    const result = await load({ locals });

    expect(result).toEqual({ workouts: [] });
  });

  it("if user exists, fetches and transforms workouts from the database", async () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    const locals = { user: mockUser };

    const mockWorkouts = [
      {
        id: 1,
        userId: 1,
        date: new Date("2023-01-01T10:00:00Z"),
        type: "cardio",
        duration: 60,
        caloriesBurned: 500,
      },
      {
        id: 2,
        userId: 1,
        date: new Date("2023-01-02T12:00:00Z"),
        type: "strength",
        duration: 45,
        caloriesBurned: 300,
      },
    ];

    const expectedTransformedWorkouts = [
      {
        id: 1,
        date: "2023-01-01",
        workoutType: "cardio",
        duration: 60,
        calories: 500,
      },
      {
        id: 2,
        date: "2023-01-02",
        workoutType: "strength",
        duration: 45,
        calories: 300,
      },
    ];

    vi.spyOn(prisma.workout, "findMany").mockResolvedValue(mockWorkouts as any);

    const result = await load({ locals });

    expect(prisma.workout.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUser.id,
      },
      orderBy: {
        date: "desc",
      },
    });
    expect(result).toEqual({ workouts: expectedTransformedWorkouts, user: mockUser });
  });
});
