import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";

export const POST: RequestHandler = async ({ request, cookies, params }) => {
  try {
    const { name, sets, reps, weight } = await request.json();
    const token = cookies.get("jwt");

    if (!token) {
      return json({ error: "Unauthorized: No token provided." }, { status: 401 });
    }

    const workoutId = Number(params.id);

    const exercise = await prisma.exercise.create({
      data: {
        name,
        sets: +sets,
        reps: +reps,
        weight: +weight,
        workout: {
          connect: { id: workoutId }
        }
      }
    });

    return json(exercise, { status: 201 });
  } catch (error) {
    console.error("Error creating exercise:", error);
    return json({ error: "Failed to create exercise." }, { status: 500 });
  }
};