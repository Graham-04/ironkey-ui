<script lang="ts">
  export let fill: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let strokeWidth: string | undefined = undefined;
</script>

<svg
  width={width || "24px"}
  height={height || "24px"}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth || "1.5"}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  color="#000000"
  ><path
    d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
    stroke={fill || "#000000"}
    stroke-width={strokeWidth || "1.5"}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>
