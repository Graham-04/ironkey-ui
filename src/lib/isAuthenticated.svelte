<script>
  import { onMount } from "svelte";
  import { getCookie } from "../services/getCookie";
  import { goto } from "$app/navigation";
  let isAuthenticated = "false";
  onMount(() => {
    isAuthenticated = getCookie("hasJwt") || "";
    if (isAuthenticated !== "true") {
      goto("/");
    }
  });
</script>

<div>
  {#if isAuthenticated === "true"}
    <slot />
  {/if}
</div>
