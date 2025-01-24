<script lang="ts">
  import WorkoutCarousel from "$lib/workout carousel/WorkoutCarousel.svelte";
  import AddWorkout from "$lib/updateWorkouts/addWorkout.svelte";
  import type { PageData } from './$types';

  export let data: PageData;

  const workouts = data.workouts as Array<{
    id: number;
    date: string;
    workoutType: string;
    duration: number;
    calories: number;
  }>;
</script>

<div class="flex flex-col items-center">
  <h1 class="text-4xl font-bold p-8">Workouts</h1>
</div>
<main class="max-w-xs mx-auto mt-8" data-testid="workout-carousel">
  {#if workouts && workouts.length > 0}
    <WorkoutCarousel {workouts} />
  {:else}
    <p>No workouts found</p>
  {/if}
</main>
<AddWorkout />