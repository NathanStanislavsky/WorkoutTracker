<script>
  import ExerciseParent from "$lib/Exercise-Parent/Exercise-Parent.svelte";
</script>

<ExerciseParent
  exercises={[
    { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
    { name: "Squats", sets: 3, reps: 10, weight: 225 },
    { name: "Deadlifts", sets: 3, reps: 10, weight: 315 },
  ]}
/>
