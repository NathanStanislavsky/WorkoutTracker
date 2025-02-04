import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "$lib/server/prisma";
import { POST } from "./+page.server";
import exp from "constants";

vi.mock("$lib/Server/prisma.ts", () => ({
  prisma: {
    workout: {
      findFirst: vi.fn(),
    },
    exercise: {
      create: vi.fn(),
    },
  },
}));

describe("addExercise Server tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("adds an exercise to a workout", async () => {
    const mockExerciseInput = {
      id: 1,
      workoutId: 1,
      name: "Push-up",
      sets: 3,
      reps: 10,
      weight: 0,
    };

    prisma.exercise.create.mockResolvedValue(mockExerciseInput);

    const request = new Request("http://localhost/addWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockExerciseInput),
    });

    const response = await POST({ request });
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({ exercise: mockExerciseInput });
    expect(prisma.workout.create).toHaveBeenCalledWith({
      data: {
        id: 1,
        workoutId: 1,
        name: "Push-up",
        sets: 3,
        reps: 10,
        weight: 0,
      },
    });
  });
});
