import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params, locals }) => {
  const { date } = params;

  const selectedDate = new Date(date);
  if (isNaN(selectedDate.getTime())) {
    return new Response(JSON.stringify({ error: 'Invalid date format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};