<script lang="ts">
  import WorkoutCarousel from "$lib/Carousel/Carousel.svelte";
  import AddWorkout from "$lib/AddWorkout/AddWorkout.svelte";
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

<main class="flex flex-1 min-h-0 p-8 gap-8">
  <section class="flex-1 min-h-0" data-testid="workout-carousel">
    {#if workouts.length > 0}
      <WorkoutCarousel {workouts} />
    {:else}
      <p class="text-center text-gray-500">No workouts found</p>
    {/if}
  </section>
</main>