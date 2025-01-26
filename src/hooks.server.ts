import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('jwt');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number; email: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (user) {
        event.locals.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
    } catch (err) {
      console.error('JWT verification failed:', err);
    }
  }
  
  return resolve(event);
};