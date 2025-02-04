import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";
import jwt from "jsonwebtoken";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { name, sets, reps, weight } = await request.json();
    const token = cookies.get("jwt");

    if (!token) {
      return json({ error: "Unauthorized: No token provided." }, { status: 401 });
    }

    let decoded: { userId: number; email: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; email: string };
    } catch (err) {
      return json({ error: "Unauthorized: Invalid token." }, { status: 401 });
    }
    
    const exercise = await prisma.exercise.create({
      data: {
        name,
        sets: +sets,
        reps: +reps,
        weight: +weight,
      },
    });

    return json(exercise, { status: 201 });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return json({ error: "Failed to create exercise." }, { status: 500 });
  }
};