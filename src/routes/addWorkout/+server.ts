import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { type, date, duration, caloriesBurned } = await request.json();
    const token = cookies.get('jwt');

    if (!token) {
      return json({ error: 'Unauthorized: No token provided.' }, { status: 401 });
    }

    let decoded: { userId: number; email: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number; email: string };
    } catch (err) {
      return json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
    }

    const workout = await prisma.workout.create({
      data: {
        type,
        date: new Date(date),
        duration: +duration,
        caloriesBurned: +caloriesBurned,
        userId: decoded.userId,
      },
    });

    return json(workout, { status: 201 });
  } catch (error) {
    console.error('Error creating workout:', error);
    return json({ error: 'Failed to create workout.' }, { status: 500 });
  }
};