import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({locals }) => {
  if (!locals.user) {
    throw error(401, "Unauthorized");
  }

  
};
