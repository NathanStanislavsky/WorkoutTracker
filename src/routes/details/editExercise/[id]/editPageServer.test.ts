import "@testing-library/jest-dom";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { load } from "./+page.server";
import { prisma } from "$lib/server/prisma";
import { actions } from "./+page.server.ts";

vi.mock("$lib/server/prisma", () => {
  return {
    prisma: {
      exercise: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
    },
  };
});

describe("Edit exercise endpoint", () => {
  const mockExercise = {
    id: 1,
    name: "Bench Press",
    sets: 3,
    reps: 10,
    weight: 100,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch the exercise in its current state", async () => {
    const params = { id: "1" };
    const locals = { user: { id: 1 } };

    (prisma.exercise.findUnique as any).mockResolvedValue({
      mockExercise,
    });

    const result = await load({ params, locals });
    expect(result.exercise).toEqual({
      mockExercise,
    });
  });
});

describe("Actions", () => {
  const fakeFormData = {
    name: "Bench Press",
    sets: "3",
    reps: "10",
    weight: "100",
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  const createFakeRequest = (data: Record<string, string>) => ({
    formData: async () => ({
      get: (key: string) => data[key],
    }),
  });

  it("calls prisma update with correct data", async () => {
    const request = createFakeRequest(fakeFormData);
    const params = { id: "1" };

    const updateSpy = vi.spyOn(prisma.exercise, "update").mockResolvedValue({});

    try {
      await actions.default({ request, params });
    } catch (err: any) {
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: "Bench Press",
          sets: 3,
          reps: 10,
          weight: 100,
        },
      });
    }
  });

  it("throws a 500 error if the update fails", async () => {
    const request = createFakeRequest(fakeFormData);
    const params = { id: "1" };

    vi.spyOn(prisma.exercise, "update").mockRejectedValue(
      new Error("DB error")
    );

    try {
      await actions.default({ request, params });
    } catch (err: any) {
      expect(err.status).toBe(500);
    }
  });
});
