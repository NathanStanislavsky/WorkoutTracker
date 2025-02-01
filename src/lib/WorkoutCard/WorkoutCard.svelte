<script lang="ts">
  export let id: number;
  export let date: string;
  export let workoutType: string;
  export let duration: number;
  export let calories: number;

  import ThreeBarMenu from "$lib/ThreeBarMenu/ThreeBarMenu.svelte";
</script>

<div class="p-10 bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-white">
  <div class="grid grid-cols-5 items-center">
    <div class="text-left">
      <h2 class="text-lg font-semibold">{workoutType}</h2>
    </div>

    <div class="text-center">
      <span class="text-xs uppercase tracking-widest text-gray-400">{date}</span>
    </div>

    <div class="text-center">
      <span class="text-sm text-gray-300 block">Duration</span>
      <span class="text-lg font-bold block">{duration} min</span>
    </div>

    <div class="text-center">
      <span class="text-sm text-gray-300 block">Calories</span>
      <span class="text-lg font-bold block">{calories}</span>
    </div>

    <div class="text-right">
      <ThreeBarMenu {id} />
    </div>
  </div>
</div>