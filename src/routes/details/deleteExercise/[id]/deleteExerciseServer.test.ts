import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "$lib/server/prisma";
import { DELETE } from "./+server";

vi.mock("$lib/server/prisma", () => {
  return {
    prisma: {
      exercise: {
        delete: vi.fn().mockResolvedValue({ id: 1, name: "Mocked exercise" }),
      },
    },
  };
});

describe("delete exercise endpoint tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should check if user jwt exists (user is logged in)", async () => {
    const locals = { user: null };
    const params = { id: "1" };

    await expect(DELETE({ params, locals } as any)).rejects.toMatchObject({
      status: 401,
      body: { message: "Unauthorized" },
    });
  });

  it("should check if exercise ID is valid", async () => {
    const locals = { user: { id: 1 } };
    const params = { id: "" };

    await expect(DELETE({ params, locals } as any)).rejects.toMatchObject({
      status: 400,
      body: { message: "Invalid exercise ID" },
    });
  });

  it("should call prisma to delete exercise with the correct id", async () => {
    const locals = { user: { id: 1 } };
    const params = { id: "1" };

    await DELETE({ params, locals } as any);

    expect(prisma.exercise.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
