<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navbar from "$lib/navbar.svelte";
  const layoutRoutes = ["/dashboard"];
  const displayLayout = layoutRoutes.includes($page.route.id as string);

  // Possible new route options structure
  // const routeOptions = {
  //   "/users": { layout: 0, auth: 1 },
  // };
</script>

<div class="overflow-x-hidden px-10 relative h-[100vh]">
  {#if displayLayout}
    <Navbar />
  {/if}
  <slot />
</div>
