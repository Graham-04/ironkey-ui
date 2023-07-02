<script lang="ts">
  import { onMount } from "svelte";
  import CheckCircleIcon from "./icons/checkCircle.svelte";
  export let type: string | undefined = undefined;
  export let text: string | undefined = undefined;
  export let display: boolean | undefined = undefined;
  export let displayError: boolean | undefined = undefined;
  let opacity: string = "opacity-1";
  let top: string = "top-[-100%]";
  $: {
    if (display) {
        display = true
    //   top = "top-1";
    //   opacity = "opacity-1";
      setTimeout(() => {
        display = false;
        // top = "top-[-100%]";
        // opacity = "opacity-0";
      }, 1500);
    } else if (displayError) {
        setTimeout(() => {
        displayError = false;
      }, 1500);
    }
  }
</script>

<!-- TODO: Remove displayError & refactor `display` to `displaySuccess` -->
<!-- {#if display} -->
  <div class="flex justify-center">
    <!-- <div class="alert duration-500 transition-all absolute ease-in mt-3 w-80 {top} {opacity} {type}"> -->
        <div class="alert animation absolute  mt-3 w-80 {display || displayError ? "open": "closed"} {type}">
      <CheckCircleIcon />
      <span>{text || "None"}</span>
    </div>
  </div>
<!-- {/if} -->

<style>
    .closed {
        top: calc(-57px - 3rem);
        opacity: 0;
    }

    .open {
        top: 0%;
        opacity: 1;
    }
    
    .animation {
        transition: all 250ms ease-in-out;
    }
</style>
