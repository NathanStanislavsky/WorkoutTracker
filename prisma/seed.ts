import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const workouts = [
    {
      userId: 1,
      type: "Cardio",
      date: new Date("2025-01-20"),
      duration: 30,
      caloriesBurned: 250,
    },
    {
      userId: 1,
      type: "Strength",
      date: new Date("2025-01-21"),
      duration: 45,
      caloriesBurned: 300,
    },
    {
      userId: 1,
      type: "Yoga",
      date: new Date("2025-01-22"),
      duration: 60,
      caloriesBurned: 200,
    },
  ];

  const createdWorkouts = await prisma.workout.createMany({
    data: workouts,
  });

  console.log("Number of workouts created:", createdWorkouts.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });