import { prisma } from "$lib/Server/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const user = locals.user;

  if (!user) {
    return { exercises: [] };
  }

  const { id } = params;
  const workoutId = Number(id);
  
  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: user.id,
      },
      include: {
        exercises: {
          orderBy: { id: "asc" },
        },
      },
    });

    if (!workout) {
      throw new Error("Workout not found");
    }

    return { exercises: workout.exercises };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};