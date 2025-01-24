import { describe, it, expect, beforeEach, vi } from "vitest";
import jwt from "jsonwebtoken";
import { prisma } from "$lib/server/prisma";
import { POST } from "./+server";
import { Request } from "node-fetch";

vi.mock('jsonwebtoken', () => ({
    default: {
      verify: vi.fn(),
    },
  }));
  
  vi.mock('$lib/server/prisma', () => ({
    prisma: {
      workout: {
        create: vi.fn(),
      },
    },
  }));

describe("add workout endpoint", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should create a workout successfully", async () => {
    const mockWorkoutInput = {
      type: "cardio",
      date: new Date().toISOString(),
      duration: 30,
      caloriesBurned: 300,
    };

    const decodedToken = { userId: 1, email: "test@example.com" };

    (jwt.verify as any).mockReturnValue(decodedToken);

    const createdWorkout = {
      id: 1,
      ...mockWorkoutInput,
      userId: decodedToken.userId,
    };

    prisma.workout.create.mockResolvedValue(createdWorkout);

    const request = new Request("http://localhost/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockWorkoutInput),
    });

    const cookies = {
      get: vi.fn().mockReturnValue("valid.jwt.token"),
    };

    const response = await POST({ request, cookies });

    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body).toEqual(createdWorkout);
    expect(prisma.workout.create).toHaveBeenCalledWith({
      data: {
        type: "cardio",
        date: new Date(mockWorkoutInput.date),
        duration: 30,
        caloriesBurned: 300,
        userId: decodedToken.userId,
      },
    });
    expect(jwt.verify).toHaveBeenCalledWith("valid.jwt.token", process.env.JWT_SECRET);
  });
});