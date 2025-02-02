import { prisma } from "$lib/Server/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  const user = locals.user;

  if (!user) {
    return { exercises: [] };
  }

  const { workoutId } = params;

  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: user.id,
      },
    });

    if (!workout) {
      throw new Error("Workout not found");
    }

    const exercises = await prisma.exercise.findMany({
      where: {
        workoutId: workout.id,
      },
      orderBy: {
        id: "asc",
      },
    });

    return { exercises };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};
