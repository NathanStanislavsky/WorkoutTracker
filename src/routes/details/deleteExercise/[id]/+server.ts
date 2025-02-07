import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) {
    throw error(401, "Unauthorized");
  }

  const exerciseId = Number(params.id);
  if (!exerciseId) {
    throw error(400, "Invalid exercise ID");
  }
};
