<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  const { exercise } = data;
</script>

<div class="h-full flex items-center justify-center">
  <form class="w-full max-w-md p-6 bg-slate-800 shadow-md rounded-md">
    <h2 class="text-2xl mb-4 text-white">Edit Exercise</h2>

    <div class="mb-4">
      <label for="name" class="block mb-2 text-white">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={exercise.name}
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="sets" class="block mb-2 text-white">Sets</label>
      <input
        type="number"
        id="sets"
        name="sets"
        min="1"
        value={exercise.sets}
        required
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="reps" class="block mb-2 text-white">Reps</label>
      <input
        type="number"
        id="reps"
        name="reps"
        min="1"
        value={exercise.reps}
        required
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="weight" class="block mb-2 text-white">Weight</label>
      <input
        type="number"
        id="weight"
        name="weight"
        min="1"
        value={exercise.weight}
        required
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
