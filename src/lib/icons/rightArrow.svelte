<script lang="ts">
  export let fill: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let strokeWidth: string | undefined = undefined;
</script>

<svg width={width || "24px"} height={height || "24px"} viewBox="0 0 24 24" stroke-width={strokeWidth || "1.5"} fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"
  ><path d="M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5" stroke={fill || "#000000"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg
>
