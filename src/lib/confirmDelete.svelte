<script lang="ts">
  import { openDeleteModal, selectedUserIds, totalUsers, userStore } from "../stores";
  import { onMount } from "svelte";
  import { deleteUser } from "../services/deleteUser";
  import Alert from "./alert.svelte";

  let modalInside: HTMLElement;
  let displayError: boolean = false;
  let display: boolean = false;

  function handler(event: MouseEvent) {
    if ($openDeleteModal && !modalInside.contains(event.target as Node)) {
      openDeleteModal.set(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (($openDeleteModal && event.key === "Tab") || event.key === "Escape") {
      event.preventDefault();
      openDeleteModal.set(false);
    }
  }

  async function deleteUsers() {
    // let result = await deleteUser()
    let result = await deleteUser({ users: $selectedUserIds });
    if (!result) {
      displayError = true;
      openDeleteModal.set(false);
      return;
    }
    // remove ids that were in selecteduserIds
    let removed = $userStore.filter((user) => {
      if ($selectedUserIds.includes(user.id)) {
        return false;
      } else {
        return true;
      }
    });
    console.log("count: ", $selectedUserIds.length)
    totalUsers.set($totalUsers - $selectedUserIds.length);

    selectedUserIds.set([]);
    userStore.set(removed);
    openDeleteModal.set(false);

    display = true;
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

{#if $openDeleteModal}
  <div class="fixed left-0 top-0 w-[100%] h-[100%] bg-[#000000bf] flex items-center justify-center cursor-pointer z-20">
    <div class="bg-white rounded-lg w-[95%] h-auto max-h-80 p-4 cursor-default w-auto" bind:this={modalInside}>
      <h1 class="text-lg font-bold text-center text-red-500 mb-2">Confirm Delete</h1>
      <p class="text-xs text-gray-400 mb-2 text-center">The follow user ID's will be deleted</p>
      <div class="bg-[#282C34] p-3 rounded-lg max-h-20 overflow-y-auto">
        {#if $selectedUserIds.length >= 1}
          {#each $selectedUserIds as id}
            <p class="text-sm text-gray-400">{id}</p>
          {/each}
        {:else}
          <p class="text-sm text-gray-400">None</p>
        {/if}
      </div>
      <div class="flex justify-center gap-5 mt-5">
        <button class="btn normal-case text-red-500 hover:bg-red-100 w-40 border-[1.5px] border-red-300 hover:border-red-400" on:click={deleteUsers}>Delete</button>
        <button class="btn normal-case w-40" on:click={() => openDeleteModal.set(false)}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
<Alert type="alert-error" text="Could not delete user" bind:displayError={displayError} />
<Alert type="alert-success" text="Successfully deleted" bind:display={display} />

<style>
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #9ca3af #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #282c34;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
    border-radius: 10px;
    border: 3px solid #282c34;
  }
</style>
