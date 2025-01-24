import { prisma } from '$lib/server/prisma';

export async function load() {
  const result = await prisma.$queryRaw`SELECT version() AS version`;
  const [{ version }] = result;

  return {
    version
  };
}