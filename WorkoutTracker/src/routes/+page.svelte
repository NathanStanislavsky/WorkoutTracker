<script>
  import Navbar from "$lib/navbar/navbar.svelte";
  export let data;
</script>

<Navbar logoUrl="/workout-logo.png" />

<h1>Database Version</h1>
<p>{data.version}</p>