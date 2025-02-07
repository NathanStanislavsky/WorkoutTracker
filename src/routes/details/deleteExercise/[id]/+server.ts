import { prisma } from "$lib/server/prisma";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) {
    throw error(401, "Unauthorized");
  }

  const exerciseId = Number(params.id);
  if (!exerciseId) {
    throw error(400, "Invalid exercise ID");
  }

  try {
    await prisma.exercise.delete({
      where: { id: exerciseId }
    });
    
    return json({ success: true });
  } catch (err) {
    console.error('Error deleting exercise:', err);
    throw error(500, 'Failed to delete exercise');
  }
};