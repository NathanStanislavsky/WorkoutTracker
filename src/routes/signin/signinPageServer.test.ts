import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./+server";
import { prisma } from "$lib/server/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

describe("POST /login endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns error if user not found in the database", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const reqBody = JSON.stringify({
      email: "nonexistent@example.com",
      password: "password",
    });

    const request = new Request("http://localhost/signin", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data).toHaveProperty("error", "Invalid credentials");
  });

  it("returns error if password does not match credentials", async () => {
    const existingUser = {
      email: "test@example.com",
      passwordHash: "$2b$10$DummyHashForTestingPurposesOnly",
    };

    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(existingUser);

    const reqBody = JSON.stringify({
      email: "test@example.com",
      password: "wrong-password",
    });

    const request = new Request("http://localhost/signin", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data).toHaveProperty("error", "Invalid credentials");
  });

  it("returns a valid token on successful login", async () => {
    const passwordHash = await bcrypt.hash("correct-password", 10);
    const fakeUser = {
      id: 1,
      email: "test@example.com",
      passwordHash,
    };
    
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(fakeUser as any);

    const reqBody = JSON.stringify({
      email: "test@example.com",
      password: "correct-password",
    });

    const request = new Request("http://localhost/signin", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty("success", true);
    expect(data).toHaveProperty("token");

    // Verify the JWT token
    const decodedToken = jwt.verify(data.token, process.env.JWT_SECRET);
    // Check that the token payload contains the expected values
    expect(decodedToken).toMatchObject({
      userId: fakeUser.id,
      email: fakeUser.email,
    });
  });
});
