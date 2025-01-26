<script lang="ts">
    export let id: number;
  </script>
  
  <form method="POST" action="?/deleteWorkout">
    <input type="hidden" name="id" value={id} />
    <button
      type="submit"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete
    </button>
  </form>