import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    throw redirect(302, "/signin");
  }

  const id = Number(params.id);

  const workout = await prisma.workout.findUnique({
    where: { id },
  });

  if (!workout) {
    throw error(404, "Workout not found");
  }

  return { workout };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    if (!locals.user) {
      throw redirect(302, "/signin");
    }

    const formData = await request.formData();

    const workoutDate = formData.get("date") as string;
    const workoutType = formData.get("type") as string;
    const workoutDuration = Number(formData.get("duration"));
    const workoutCalories = Number(formData.get("calories"));

    const id = Number(params.id);

    try {
      await prisma.workout.update({
        where: { id },
        data: {
          date: new Date(workoutDate),
          type: workoutType,
          duration: workoutDuration,
          caloriesBurned: workoutCalories,
        },
      });
    } catch (err) {
      console.error("Error updating workout", err);
      throw error(500, "Could not update workout");
    }

    throw redirect(302, "/workout");
  },
};
