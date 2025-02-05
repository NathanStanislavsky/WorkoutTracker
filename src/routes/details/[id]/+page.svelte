<script lang="ts">
  import ExerciseParent from "$lib/Exercise-Parent/Exercise-Parent.svelte";

  import type { PageData } from "./$types";
  export let data: PageData;

  const exercises = data.exercises as Array<{
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }>;
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="w-full max-w-xl h-[75vh]">
    {#if exercises.length > 0}
      <ExerciseParent {exercises} />
    {:else}
      <p class="text-center text-gray-500">No exercises found</p>
    {/if}
  </div>
</div>

<button
  class="absolute bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white font-bold w-16 h-16 text-xl rounded-full flex items-center justify-center shadow-md"
  aria-label="Add new exercise"
  data-testid="add-exercise-button"
>
  +
</button>