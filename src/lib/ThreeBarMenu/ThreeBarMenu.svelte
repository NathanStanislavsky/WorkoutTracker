<script>
    let isOpen = false;
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  </script>
  
  <div class="relative inline-block text-left">
    <button 
      on:click={toggleMenu}
      class="flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none"
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
      </div>
    {/if}
  </div>
