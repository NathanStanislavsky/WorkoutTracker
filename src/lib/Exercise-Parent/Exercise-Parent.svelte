<script lang="ts">
    import Exercise from "../Exercise/Exercise.svelte";
    
    export let exercises: {
        name: string;
        sets: number;
        reps: number;
        weight: number;
    }[];
  </script>
  
  <div
    class="h-3/4 overflow-y-auto flex flex-col space-y-4 p-4 snap-y snap-mandatory"
  >
    {#each exercises as exercise}
      <div class="snap-start">
        <Exercise
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
            weight={exercise.weight}
        />
      </div>
    {/each}
  </div>
  