<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { get } from "svelte/store";

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const { params } = get(page);
    const { id } = params;

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const res = await fetch(`/details/${id}/addExercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      console.log("Exercise added:", result);
      goto(`/details/${id}`);
    } else {
      console.error("Error adding exercise:", result.error);
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <form
    on:submit={handleSubmit}
    class="w-full max-w-md p-6 bg-slate-800 shadow-md rounded"
  >
    <h2 class="text-2xl mb-4 text-white">Add a New Exercise</h2>

    <div class="mb-4">
      <label for="exercise-name" class="block mb-2 text-white"
        >Exercise Name</label
      >
      <input
        type="text"
        id="exercise-name"
        name="name"
        placeholder="Enter exercise name"
        required
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="sets" class="block mb-2 text-white">Sets</label>
      <input
        type="number"
        id="sets"
        name="sets"
        required
        min="1"
        placeholder="Enter number of sets"
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="reps" class="block mb-2 text-white">Reps</label>
      <input
        type="number"
        id="reps"
        name="reps"
        required
        min="1"
        placeholder="Enter number of reps"
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="weight" class="block mb-2 text-white">Weight</label>
      <input
        type="number"
        id="weight"
        name="weight"
        required
        min="0"
        placeholder="Enter weight used"
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 text-white"
    >
      Add Exercise
    </button>
  </form>
</div>
