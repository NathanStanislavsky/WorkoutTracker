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
    };
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return {
      workouts: [],
    };
  }
};

export const actions: Actions = {
  deleteWorkout: async ({ request, locals }) => {
    if (!locals.user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const workoutId = formData.get("id") as string;

    try {
      await prisma.workout.delete({
        where: {
          id: Number(workoutId),
        },
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  },
};
