import { prisma } from "$lib/server/prisma";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

function validateUser(locals: any) {
  if (!locals?.user) {
    throw error(401, "Unauthorized");
  }
}

function parseExerciseId(id: unknown): number {
  const parsedId = Number(id);
  if (!parsedId) {
    throw error(400, "Invalid exercise ID");
  }
  return parsedId;
}

export const DELETE: RequestHandler = async ({ params, locals }) => {
  validateUser(locals);
  const exerciseId = parseExerciseId(params.id);

  try {
    await prisma.exercise.delete({
      where: { id: exerciseId },
    });
    return json({ success: true });
  } catch (err) {
    console.error("Error deleting exercise:", err);
    throw error(500, "Failed to delete exercise");
  }
};
