<script>
    export let logoUrl = "/workout-logo.png";
  </script>
  
  <nav class="bg-slate-800 p-4 h-24 text-white">
    <div class="container mx-auto flex items-center h-full">
      <!-- Logo & Title -->
      <div class="flex items-center">
        <img src={logoUrl} alt="Workout logo" class="h-10 w-auto mr-3" />
        <span class="font-bold text-5xl">Workout Tracker</span>
      </div>
  
      <!-- Home Button -->
      <a href="/" class="ml-auto">
        <button
          class="bg-slate-700 hover:bg-slate-600 transition-colors 
                 px-5 py-2 rounded-md text-white text-2xl font-medium"
        >
          Home
        </button>
      </a>
    </div>
  </nav>