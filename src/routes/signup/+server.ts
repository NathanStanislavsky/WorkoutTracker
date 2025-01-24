import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma.ts";
import bcrypt from "bcryptjs";

export const POST: RequestHandler = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const { email, password, name, age, weight } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        age: Number(age),
        weight: Number(weight),
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        userId: newUser.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
};
