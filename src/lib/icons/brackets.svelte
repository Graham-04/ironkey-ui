<script lang="ts">
  export let fill: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let strokeWidth: string | undefined = undefined;
</script>

<svg
  width={width || "24px"}
  stroke-width={strokeWidth || "1.3"}
  height={height || "24px"}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  color="#000000"
  ><path
    d="M9 21H8c-1.105 0-2-.894-2-1.999V14c0-1-1.5-2-1.5-2S6 11 6 10V5a2 2 0 012-2h1M15 21h1c1.105 0 2-.894 2-1.999V14c0-1 1.5-2 1.5-2S18 11 18 10V5a2 2 0 00-2-2h-1"
    stroke={fill || "#000000"}
    stroke-width={strokeWidth || "1.3"}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>
