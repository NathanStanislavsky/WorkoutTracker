import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "$lib/server/prisma";
import { POST } from "./+server";

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn(),
  },
}));

vi.mock("$lib/server/prisma", () => ({
  prisma: {
    exercise: {
      create: vi.fn(),
    },
  },
}));

describe("addExercise Server tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("adds an exercise", async () => {
    const mockExerciseInput = {
      name: "Push-up",
      sets: 3,
      reps: 10,
      weight: 0,
    };

    const createdExercise = {
      id: 1,
      workoutId: 1,
      ...mockExerciseInput,
    };

    prisma.exercise.create.mockResolvedValue(createdExercise);

    const request = new Request("http://localhost/addExercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockExerciseInput),
    });

    const cookies = {
      get: vi.fn().mockReturnValue("valid.jwt.token"),
    };

    const response = await POST({
      request,
      cookies,
      params: { id: "1" }
    });

    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual(createdExercise);
    expect(prisma.exercise.create).toHaveBeenCalledWith({
      data: {
        name: mockExerciseInput.name,
        sets: +mockExerciseInput.sets,
        reps: +mockExerciseInput.reps,
        weight: +mockExerciseInput.weight,
        workout: {
          connect: { id: 1 }
        }
      },
    });
  });
});
