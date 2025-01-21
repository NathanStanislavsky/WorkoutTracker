
<script lang="ts">
    import WorkoutItem from "../workout card/WorkoutItem.svelte";
  
    export let workouts: {
      date: string;
      workoutType: string;
      duration: number;
      calories: number;
    }[];
  </script>
  
  <div class="overflow-y-auto h-96 flex flex-col space-y-4 p-4 snap-y snap-mandatory">
    {#each workouts as workout}
      <div class="snap-start">
        <WorkoutItem
          date={workout.date}
          workoutType={workout.workoutType}
          duration={workout.duration}
          calories={workout.calories}
        />
      </div>
    {/each}
  </div>