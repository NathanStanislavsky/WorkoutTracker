<script lang="ts">
  import WorkoutCarousel from "$lib/Carousel/Carousel.svelte";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import Calendar from "$lib/Calendar/Calendar.svelte";

  export let data: PageData;

  const workouts = data.workouts as Array<{
    id: number;
    date: string;
    workoutType: string;
    duration: number;
    calories: number;
  }>;

  const user = data.user as {
    id: number;
    name: string;
    email: string;
  };

  function handleAddWorkout() {
    goto("../addWorkout");
  }
</script>

<main class="flex min-h-0 p-8 gap-8">
  <div>
    <h1 class="text-3xl font-bold">Welcome back, {user.name}!</h1>
  </div>

  <section class="flex-1 min-h-0" data-testid="workout-carousel">
    {#if workouts.length > 0}
      <WorkoutCarousel {workouts} />
    {:else}
      <p class="text-center text-gray-500">No workouts found</p>
    {/if}
  </section>

  <button
    class="absolute bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold w-16 h-16 text-xl rounded-full flex items-center justify-center shadow-md"
    aria-label="Add new workout"
    data-testid="add-workout-button"
    on:click={handleAddWorkout}
  >
    +
  </button>

  <div class="min-h-0">
    <Calendar />
  </div>
</main>
