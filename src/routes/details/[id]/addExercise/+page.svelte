<script>
</script>

<div class="flex items-center justify-center min-h-screen">
  <form
    class="w-full max-w-md p-6 bg-slate-800 shadow-md rounded"
    method="post"
    action="?/addExercise"
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
