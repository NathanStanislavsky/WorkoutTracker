<script lang="ts">
    import WorkoutItem from '$lib/workout card/WorkoutItem.svelte';
  
    const workouts = [
      {
        date: '2025-01-20',
        workoutType: 'Cardio',
        duration: 30,
        calories: 250
      },
      {
        date: '2025-01-21',
        workoutType: 'Strength',
        duration: 45,
        calories: 300
      }
    ];
  </script>
  
  <section class="max-w-2xl mx-auto mt-8 space-y-4">
    {#each workouts as workout}
      <WorkoutItem 
        date={workout.date}
        workoutType={workout.workoutType}
        duration={workout.duration}
        calories={workout.calories}
      />
    {/each}
  </section>