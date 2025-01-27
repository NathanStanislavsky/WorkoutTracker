<script lang="ts">
  export let id: number;
  export let date: string;
  export let workoutType: string;
  export let duration: number;
  export let calories: number;

  import ThreeBarMenu from "$lib/ThreeBarMenu/ThreeBarMenu.svelte";
</script>

<div
  class="p-5 bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-white"
>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-semibold">
      {workoutType}
    </h2>

    <div class="flex items-center space-x-2">
      <span class="text-xs uppercase tracking-widest text-gray-400">
        {date}
      </span>
    </div>

    <div>
      <p class="text-sm text-gray-300">Duration</p>
      <p class="text-lg font-bold">
        {duration} min
      </p>
    </div>

    <div class="flex items-center space-x-2">
      <div>
        <p class="text-sm text-gray-300">Calories</p>
        <p class="text-lg font-bold">
          {calories}
        </p>
      </div>
    </div>

    <div class="w-20">
      <ThreeBarMenu {id} />
    </div>
  </div>
</div>
