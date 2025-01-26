<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  let { workout } = data;

  let workoutType = workout.type;
  let workoutDate = new Date(workout.date).toISOString().split("T")[0];
  let workoutDuration = workout.duration;
  let workoutCalories = workout.caloriesBurned;
</script>

<div class="flex-grow flex items-center justify-center">
  <form
    method="post"
    class="max-w-md mx-auto p-6 bg-slate-800 shadow-md rounded"
  >
    <h2 class="text-2xl mb-4 text-white">Edit Workout</h2>

    <div class="mb-4">
      <label for="workout-type" class="block mb-2 text-white">Type</label>
      <select
        id="workout-type"
        name="type"
        bind:value={workoutType}
        class="w-full px-3 py-2 border rounded"
      >
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Flexibility">Flexibility</option>
        <option value="Balance">Balance</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="workout-date" class="block mb-2 text-white">Date</label>
      <input
        type="date"
        id="workout-date"
        name="date"
        required
        bind:value={workoutDate}
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="workout-duration" class="block mb-2 text-white"
        >Duration</label
      >
      <input
        type="number"
        id="workout-duration"
        name="duration"
        min="1"
        required
        bind:value={workoutDuration}
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="calories-burned" class="block mb-2 text-white"
        >Calories Burned</label
      >
      <input
        type="number"
        id="calories-burned"
        name="calories"
        min="1"
        required
        bind:value={workoutCalories}
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 text-white"
    >
      Save Changes
    </button>
  </form>
</div>
