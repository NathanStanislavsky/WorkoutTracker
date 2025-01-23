import { describe, it, expect, vi, beforeEach } from "vitest";
import { handle } from "./hooks.server";
import { prisma } from "$lib/server/prisma";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

describe("handle function in hooks.server.ts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("attaches user to event.locals when valid JWT is provided", async () => {
    const user = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(user as any);

    const event = {
      cookies: {
        get: vi.fn().mockReturnValue(token),
      },
      locals: {} as any,
    };

    const resolve = vi.fn().mockResolvedValue(new Response("OK"));

    await handle({ event, resolve });

    expect(event.cookies.get).toHaveBeenCalledWith("jwt");
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: user.id },
      select: { id: true, name: true, email: true },
    });
    expect(event.locals.user).toEqual(user);
    expect(resolve).toHaveBeenCalledWith(event);
  });
});
