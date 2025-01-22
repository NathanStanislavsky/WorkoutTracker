<script>
  import WorkoutList from '$lib/workout carousel/WorkoutCarousel.svelte';
  
  const workouts = [
    {
      date: "2025-01-20",
      workoutType: "Cardio",
      duration: 30,
      calories: 250,
    },
    {
      date: "2025-01-21",
      workoutType: "Strength",
      duration: 45,
      calories: 300,
    },
    {
      date: "2025-01-22",
      workoutType: "Yoga",
      duration: 60,
      calories: 200,
    },
    {
      date: "2025-01-20",
      workoutType: "Cardio",
      duration: 30,
      calories: 250,
    },
    {
      date: "2025-01-21",
      workoutType: "Strength",
      duration: 45,
      calories: 300,
    },
    {
      date: "2025-01-22",
      workoutType: "Yoga",
      duration: 60,
      calories: 200,
    },
  ];
</script>

<div class="flex flex-col items-center h-screen">
  <h1 class="text-4xl font-bold">Workouts</h1>
  <main class="max-w-4xl mx-auto mt-8" data-testid="workout-carousel" >
    <WorkoutList {workouts}/>
  </main>
</div>