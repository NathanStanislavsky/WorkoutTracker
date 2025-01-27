<script>
  import "../app.css";
  import Navbar from "../lib/Navbar/Navbar.svelte";
</script>

<div class="flex flex-col h-screen overflow-hidden">
  <Navbar logoUrl="/workout-logo.png" />
  <div class="flex-1">
    <slot />
  </div>
</div>