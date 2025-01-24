<script lang="ts">
</script>

<form class="max-w-md mx-auto p-6 bg-slate-800 shadow-md rounded">
  <h2 class="text-2xl mb-4 text-white">Add a New Workout</h2>

  <div class="mb-4">
    <label for="workout-type" class="block mb-2 text-white">Type</label>
    <select id="workout-type" class="w-full px-3 py-2 border rounded">
      <option value="cardio">Cardio</option>
      <option value="strength">Strength</option>
      <option value="flexibility">Flexibility</option>
      <option value="balance">Balance</option>
    </select>
  </div>

  <div class="mb-4">
    <label for="workout-date" class="block mb-2 text-white">Date</label>
    <input
      type="date"
      id="workout-date"
      required
      class="w-full px-3 py-2 border rounded"
    />
  </div>

  <div class="mb-4">
    <label for="workout-duration" class="block mb-2 text-white">Duration (minutes)</label>
    <input
      type="number"
      id="workout-duration"
      required
      min="1"
      class="w-full px-3 py-2 border rounded"
    />
  </div>

  <div class="mb-4">
    <label for="calories-burned" class="blockmb-2 text-white">Calories Burned</label>
    <input
      type="number"
      id="calories-burned"
      required
      min="1"
      class="w-full px-3 py-2 border rounded"
    />
  </div>

  <button
    type="submit"
    class="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 text-white"
  >
    Add Workout
  </button>
</form>
