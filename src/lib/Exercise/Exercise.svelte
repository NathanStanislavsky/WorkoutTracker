<script lang="ts">
  export let name: string;
  export let sets: number;
  export let reps: number;
  export let weight: number;
</script>

<div
  class="p-5 bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-white"
>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold">{name}</h2>

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
