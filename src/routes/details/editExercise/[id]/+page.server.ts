import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    throw redirect(302, "/signin");
  }

  const id = Number(params.id);

  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  if (!exercise) {
    throw error(404, "Exercise not found");
  }

  return { exercise };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    let formData = await request.formData();

    const exerciseName = formData.get("name") as string;
    const exerciseSets = Number(formData.get("sets"));
    const exerciseReps = Number(formData.get("reps"));
    const exerciseWeight = Number(formData.get("weight"));

    const id = Number(params.id);

    try {
      await prisma.exercise.update({
        where: { id },
        data: {
          name: exerciseName,
          sets: exerciseSets,
          reps: exerciseReps,
          weight: exerciseWeight,
        },
      });
    } catch (err) {
      console.error("Error updating exercise", err);
      throw error(500, "Could not update exercise");
    }
  }
};