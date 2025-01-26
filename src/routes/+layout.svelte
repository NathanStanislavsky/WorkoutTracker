<script>
  import "../app.css";
  import Navbar from "../lib/navbar/navbar.svelte";
</script>


<div class="flex flex-col h-screen">
  <Navbar logoUrl="/workout-logo.png" />

    <slot />
</div>