<script lang="ts">
  import WorkoutItem from "../WorkoutCard/WorkoutCard.svelte";
  
  export let workouts: {
    id: number;
    date: string;
    workoutType: string;
    duration: number;
    calories: number;
  }[];
</script>

<div
  class="h-3/4 overflow-y-auto flex flex-col space-y-4 p-4 snap-y snap-mandatory"
>
  {#each workouts as workout}
    <div class="snap-start">
      <WorkoutItem
        id={workout.id}
        date={workout.date}
        workoutType={workout.workoutType}
        duration={workout.duration}
        calories={workout.calories}
      />
    </div>
  {/each}
</div>
