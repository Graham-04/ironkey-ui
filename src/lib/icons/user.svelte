<script lang="ts">
    export let fill: string | undefined = undefined;
    export let width: string | undefined = undefined;
    export let height: string | undefined = undefined;
    export let strokeWidth: string | undefined = undefined;
  </script>
  
<svg width={width || "24px"} height={height || "24px"} stroke-width={strokeWidth || "1.5"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"
    ><path d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z" stroke={fill || "#000000"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>