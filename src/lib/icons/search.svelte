<script lang="ts">
  export let fill: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let strokeWidth: string | undefined = undefined;
</script>

<svg width={width || "24px"} height={height || "24px"} viewBox="0 0 24 24" stroke-width={strokeWidth || "1.5"} fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"
  ><path d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z" stroke={fill || "#000000"} stroke-width={strokeWidth || "1.5"} stroke-linecap="round" stroke-linejoin="round" /></svg
>
