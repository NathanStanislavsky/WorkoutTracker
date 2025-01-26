<script lang="ts">
  import WorkoutCarousel from "$lib/workout carousel/WorkoutCarousel.svelte";
  import AddWorkout from "$lib/updateWorkouts/addWorkout.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const workouts = data.workouts as Array<{
    id: number;
    date: string;
    workoutType: string;
    duration: number;
    calories: number;
  }>;
</script>

<div class="flex flex-col min-h-screen">
  <main class="flex-grow p-8">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1" data-testid="workout-carousel">
        {#if workouts && workouts.length > 0}
          <WorkoutCarousel {workouts} />
        {:else}
          <p class="text-center text-gray-500">No workouts found</p>
        {/if}
      </div>

      <div class="w-full md:w-1/3">
        <AddWorkout />
      </div>
    </div>
  </main>
</div>
