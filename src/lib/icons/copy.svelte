<script lang="ts">
  export let fill: string | undefined = undefined;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let strokeWidth: string | undefined = undefined;
</script>

<svg
  width={width || "24px"}
  height={height || "24px"}
  stroke-width={strokeWidth || "1.3"}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  color="#000000"
  ><path
    d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h9.8a.6.6 0 01.6.6v9.8a.6.6 0 01-.6.6z"
    stroke={fill || "#000000"}
    stroke-width="1.3"
    stroke-linecap="round"
    stroke-linejoin="round"
  /><path
    d="M15 9V4.6a.6.6 0 00-.6-.6H4.6a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6H9"
    stroke={fill || "#000000"}
    stroke-width={strokeWidth || "1.3"}
    stroke-linecap="round"
    stroke-linejoin="round"
  /></svg
>
