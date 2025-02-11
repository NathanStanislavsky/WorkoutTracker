import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  const id = Number(params.id);

  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  if (!exercise) {
    throw error(404, "Workout not found");
  }

  return { exercise };
};
