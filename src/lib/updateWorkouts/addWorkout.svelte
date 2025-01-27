<script lang="ts">
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const res = await fetch("/addWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      console.log("Workout added:", result);
      window.location.reload();
    } else {
      console.error("Error adding workout:", result.error);
    }
  }
</script>

<form class="max-w-md mx-auto p-6 bg-slate-800 shadow-md rounded" on:submit={handleSubmit}>
  <h2 class="text-2xl mb-4 text-white">Add a New Workout</h2>

  <div class="mb-4">
    <label for="workout-type" class="block mb-2 text-white">Type</label>
    <select id="workout-type" name="type" class="w-full px-3 py-2 border rounded">
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
      class="w-full px-3 py-2 border rounded"
    />
  </div>

  <div class="mb-4">
    <label for="workout-duration" class="block mb-2 text-white"
      >Duration (minutes)</label
    >
    <input
      type="number"
      id="workout-duration"
      name="duration"
      required
      min="1"
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
      name="caloriesBurned"
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