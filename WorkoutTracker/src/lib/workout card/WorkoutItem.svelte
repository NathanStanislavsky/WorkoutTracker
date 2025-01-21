<script lang="ts">
  export let date: string;
  export let workoutType: string;
  export let duration: number;
  export let calories: number;
</script>

<div class="p-4 bg-white shadow rounded hover:shadow-lg transition-shadow">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold text-gray-900">{workoutType}</h2>
    <span class="text-sm text-gray-500">{date}</span>
  </div>
  <div class="mt-2 text-gray-600">
    <p>Duration: {duration} minutes</p>
    <p>Calories Burned: {calories}</p>
  </div>
</div>
