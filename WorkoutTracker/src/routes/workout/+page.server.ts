import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import type { Workout } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return {
      workouts: [],
    };
  }

  
};
