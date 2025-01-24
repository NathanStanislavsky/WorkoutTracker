// server.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./+server";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcryptjs";

describe("POST /signup endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a new user when the email is unique", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const fakeUser = { id: 123, email: "test@example.com", name: "Test", age: 25, weight: 70 };
    vi.spyOn(prisma.user, "create").mockResolvedValue(fakeUser as any);

    const hashSpy = vi.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");

    const reqBody = JSON.stringify({
      email: "test@example.com",
      password: "password",
      name: "Test",
      age: 25,
      weight: 70,
    });
    const request = new Request("http://localhost/signup", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty("message", "User registered successfully");
    expect(data).toHaveProperty("userId", fakeUser.id);
    expect(hashSpy).toHaveBeenCalledWith("password", 10);
  });

  it("should return an error when the user already exists", async () => {
    const existingUser = { id: 123, email: "test@example.com" };
    vi.spyOn(prisma.user, "findUnique").mockResolvedValue(existingUser as any);

    const reqBody = JSON.stringify({
      email: "test@example.com",
      password: "password",
      name: "Test",
      age: 25,
      weight: 70,
    });
    const request = new Request("http://localhost/signup", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty("error", "User already exists");
  });

  it("should return a 500 error when an exception is thrown", async () => {
    vi.spyOn(prisma.user, "findUnique").mockImplementation(() => {
      throw new Error("Simulated DB error");
    });

    const reqBody = JSON.stringify({
      email: "error@example.com",
      password: "password",
      name: "Error",
      age: 30,
      weight: 80,
    });
    const request = new Request("http://localhost/signup", {
      method: "POST",
      body: reqBody,
    });

    const response = await POST({ request });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty("error", "Failed to register user");
  });
});