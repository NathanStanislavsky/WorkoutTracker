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
  const mockDate = "2023-09-15";
  const parsedDate = new Date(mockDate);

  const startOfDay = new Date(parsedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(parsedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const mockWorkouts = [
    { id: 1, userId: "user1", date: startOfDay.toISOString() },
    { id: 2, userId: "user1", date: endOfDay.toISOString() },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return workouts for a valid date and authenticated user", async () => {
    prisma.workout.findMany.mockResolvedValue(mockWorkouts);

    const context = {
      params: { date: mockDate },
      locals: { user: { id: "user1" } },
    };

    const response = await GET(context as any);

    expect(prisma.workout.findMany).toHaveBeenCalledWith({
      where: {
        userId: "user1",
        date: {
          gte: expect.any(Date),
          lte: expect.any(Date),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(mockWorkouts);
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

  it("should return 401 when user is not authenticated", async () => {
    const requestHandler = GET;

    const context = {
      params: { date: mockDate },
      locals: {},
    };

    const response = await requestHandler(context as any);

    expect(prisma.workout.findMany).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Unauthorized" });
  });
});
