<script>
  import "../app.css";
  import Navbar from "../lib/navbar/navbar.svelte";
</script>

<div class="flex flex-col min-h-screen">

  <Navbar logoUrl="/workout-logo.png" />
  
  <main class="flex-grow flex items-center justify-center bg-gray-100">
    <slot />
  </main>
  
</div>