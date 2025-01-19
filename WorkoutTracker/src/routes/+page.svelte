<script>
  import Navbar from "$lib/navbar/navbar.svelte";
  export let data;
</script>

<Navbar logoUrl="/workout-logo.png" />

<h1>DB version: {data.version}</h1>