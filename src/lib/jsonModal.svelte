<script lang="ts">
  import { onMount } from "svelte";
  import CopyIcon from "./icons/copy.svelte";
  import { openModal, currentUserData } from "../stores";
  let modalInside: HTMLElement;
  let openModalState: boolean = true;
  let userData: string;
  let copyText: boolean = false;
  function wrapJSON(json: object) {
    var jsonString = JSON.stringify(json, null, 2);

    // Wrapping keys
    jsonString = jsonString.replace(/\"(.*?)\"(?=\s*:)/g, '<span class="key text-[#E06C75]">"$1"</span>');

    // Wrapping values
    jsonString = jsonString.replace(/:\s*\"(.*?)\"(?=\s*[,}])/g, ': <span class="value text-[#98C379]">"$1"</span>');

    // Wrapping null values
    jsonString = jsonString.replace(/:\s*(null)(?=\s*[,}])/g, ': <span class="value text-[#98C379]">$1</span>');

    // Wrapping colons
    jsonString = jsonString.replace(/:/g, '<span class="colon text-[#CCCCCC]">:</span>');

    // Wrapping commas
    jsonString = jsonString.replace(/,/g, '<span class="comma text-[#CCCCCC]">,</span>');

    // Wrapping outer brackets
    jsonString = jsonString.replace(/^\{/, '<span class="bracket text-[#E5C07B]">{</span>');
    jsonString = jsonString.replace(/\}$/, '<span class="bracket text-[#E5C07B]">}</span>');

    return jsonString;
  }

  currentUserData.subscribe((newState) => {
    userData = wrapJSON(newState);
    // userData = newState;
  });
  openModal.subscribe((newState) => {
    // console.log("new state", newState);
    openModalState = newState;
  });
  let json: HTMLElement;
  function handler(event: MouseEvent) {
    if (openModalState && !modalInside.contains(event.target as Node)) {
      openModal.set(false);
    }
  }
  function handleKeyDown(event: KeyboardEvent) {
    if ((openModalState && event.key === "Tab") || event.key === "Escape") {
      event.preventDefault();
      openModal.set(false);
    }
  }
  function copyJson() {
    navigator.clipboard.writeText(json.textContent || "");
    copyText = true;
  }

  onMount(() => {
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

{#if openModalState}
  <div class="fixed left-0 top-0 w-[100%] h-[100%] bg-[#000000bf] flex items-center justify-center cursor-pointer z-20">
    <div class="bg-white rounded-lg w-[95%] h-auto max-h-80 p-4 cursor-default w-auto" bind:this={modalInside}>
      <div class="bg-[#282C34] p-3 rounded-lg relative flex flex-col max-h-full">
        <button
          class="tooltip absolute top-0 right-0 m-2"
          data-tip={copyText ? "copied" : "copy"}
          on:click={copyJson}
          on:mouseleave={() => {
            setTimeout(() => {
              copyText = false;
            }, 250);
          }}
        >
          <button tabindex="0" class="ml-auto duration-300 ease-in hover:bg-[#1D2025] p-1.5 rounded-md cursor-pointer outline-2 outline-transparent focus:outline-base-300">
            <CopyIcon fill="#FFF" />
          </button>
        </button>

        <pre class="m-0 p-0"><code bind:this={json} class="text-sm block">{@html userData}</code></pre>
      </div>
    </div>
  </div>
{/if}
