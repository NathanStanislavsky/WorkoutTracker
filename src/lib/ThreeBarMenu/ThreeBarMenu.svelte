<script lang="ts">
  export let id: number;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function handleEdit() {
    window.location.href = `/workout/edit/${id}`;
  }

  async function handleDelete() {
    const confirmed = confirm('Are you sure you want to delete this workout?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/workout/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Failed to delete workout.');
        return;
      }

      window.location.reload();
    } catch (e) {
      console.error(e);
      alert('An error occurred while deleting the workout.');
    }
  }
</script>

<div class="relative inline-block text-left">
  <button
    on:click={toggleMenu}
    class="flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none hover:bg-slate-700"
    aria-label="Toggle menu"
  >
    <span class="block w-6 h-0.5 bg-white"></span>
    <span class="block w-6 h-0.5 bg-white"></span>
    <span class="block w-6 h-0.5 bg-white"></span>
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-36 bg-slate-700 border border-gray-200 rounded shadow-md"
      role="menu"
    >
      <button
        on:click={handleEdit}
        class="block w-full px-4 py-2 text-left hover:bg-slate-500 focus:outline-none"
        role="menuitem"
      >
        Edit
      </button>
      <button
        on:click={handleDelete}
        class="block w-full px-4 py-2 text-left hover:bg-slate-500 focus:outline-none text-white"
        role="menuitem"
      >
        Delete
      </button>
    </div>
  {/if}
</div>
