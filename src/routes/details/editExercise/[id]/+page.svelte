<script lang="ts">
</script>

<div class="h-full flex items-center justify-center">
  <form
    class="w-full max-w-md p-6 bg-slate-800 shadow-md rounded-md"
  >
    <h2 class="text-2xl mb-4 text-white">Edit Exercise</h2>

    <div class="mb-4">
      <label for="exercise-type" class="block mb-2 text-white">Name</label>
      <input
        type="text"
        id="exercise-type"
        name="exercise-type"
        placeholder="Enter exercise name"
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div class="mb-4">
      <label for="exercise-sets" class="block mb-2 text-white"
        >Sets</label
      >
      <input
        type="number"
        id="exercise-sets"
        name="sets"
        min="1"
        required
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="exercise-reps" class="block mb-2 text-white"
        >Reps</label
      >
      <input
        type="number"
        id="exercise-reps"
        name="reps"
        min="1"
        required
        class="w-full px-3 py-2 border rounded"
      />
    </div>

    <div class="mb-4">
      <label for="weight" class="block mb-2 text-white"
        >Weight</label
      >
      <input
        type="number"
        id="weight"
        name="weight"
        min="1"
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

