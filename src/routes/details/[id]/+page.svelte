<script>
  import ExerciseParent from "$lib/Exercise-Parent/Exercise-Parent.svelte";
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="w-full max-w-xl h-[75vh]">
    <ExerciseParent
      exercises={[
        { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
        { name: "Squats", sets: 3, reps: 10, weight: 225 },
        { name: "Deadlifts", sets: 3, reps: 10, weight: 315 },
        { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
        { name: "Squats", sets: 3, reps: 10, weight: 225 },
        { name: "Deadlifts", sets: 3, reps: 10, weight: 315 },
        { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
        { name: "Squats", sets: 3, reps: 10, weight: 225 },
        { name: "Deadlifts", sets: 3, reps: 10, weight: 315 },
      ]}
    />
  </div>
</div>
