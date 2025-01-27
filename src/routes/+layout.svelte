<script>
  import "../app.css";
  import Navbar from "../lib/Navbar/Navbar.svelte";
</script>

<div class="flex flex-col h-screen overflow-hidden">
  <Navbar logoUrl="/workout-logo.png" />
  <div class="flex-grow min-h-0">
    <slot />
  </div>
</div>