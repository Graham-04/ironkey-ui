<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navbar from "$lib/navbar.svelte";
  const layoutRoutes = ["/users"];
  const displayLayout = layoutRoutes.includes($page.route.id as string);

  // Possible new route options structure
  const routeOptions = {
    "/users": { layout: 0, auth: 1 },
  };
</script>

<!-- TODO: check displayLayout and maybe isAuthenticated (only display NavBar if isAuthenticated is true and `auth` is `1`)  -->
<!-- {#if displayLayout} -->
<div class="overflow-x-hidden px-10 relative h-[100vh]">
  <Navbar />
  <slot />
</div>
<!-- {/if} -->
