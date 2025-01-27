import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }

  const workoutId = Number(params.id);
  if (!workoutId) {
    throw error(400, 'Invalid workout ID');
  }

  try {
    await prisma.workout.delete({
      where: { id: workoutId }
    });
    
    return json({ success: true });
  } catch (err) {
    console.error('Error deleting workout:', err);
    throw error(500, 'Failed to delete workout');
  }
};