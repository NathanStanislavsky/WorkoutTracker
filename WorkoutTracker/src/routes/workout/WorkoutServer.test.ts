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
});
