<script lang="ts">
  import { goto } from "$app/navigation";

  export let id: number;
  export let name: string;
  export let sets: number;
  export let reps: number;
  export let weight: number;

  async function deleteExercise() {
    const response = await fetch(`/details/deleteExercise/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete exercise");
    }
    location.reload();
  }

  async function editExercise() {
    goto(`/details/editExercise/${id}`);
  }
</script>

<div
  class="relative p-5 bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-white"
>
  <button
    on:click={deleteExercise}
    class="absolute top-1 right-2 text-gray-400 hover:text-white"
    aria-label="Delete Exercise"
  >
    x
  </button>

  <button
    on:click={editExercise}
    class="absolute bottom-1 right-2 text-gray-400 hover:text-white"
    aria-label="Edit Exercise"
  >
    edit
  </button>

  <div class="grid grid-cols-4 items-center gap-4 mb-4">
    <h2 class="text-lg font-semibold truncate">{name}</h2>

    <div class="flex flex-col items-center">
      <p class="text-sm text-gray-300">Sets</p>
      <p class="text-lg font-bold">{sets}</p>
    </div>

    <div class="flex flex-col items-center">
      <p class="text-sm text-gray-300">Reps</p>
      <p class="text-lg font-bold">{reps}</p>
    </div>

    <div class="flex flex-col items-center">
      <p class="text-sm text-gray-300">Weight</p>
      <p class="text-lg font-bold">{weight}</p>
    </div>
  </div>
</div>
