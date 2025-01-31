import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import type { Workout } from "@prisma/client";
import { json } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      workouts: [],
    };
  }

  try {
    const workouts: Workout[] = await prisma.workout.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    const transformedWorkouts = workouts.map((workout) => ({
      id: workout.id,
      date: workout.date.toISOString().split("T")[0],
      workoutType: workout.type,
      duration: workout.duration,
      calories: workout.caloriesBurned,
    }));

    return {
      workouts: transformedWorkouts,
      user: user,
    };
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return {
      workouts: [],
      user: user,
    };
  }
};
