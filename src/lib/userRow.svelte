<script lang="ts">
  import MoreIcon from "$lib/icons/more.svelte";
  import TrashIcon from "$lib/icons/trash.svelte";
  import BracketsIcon from "./icons/brackets.svelte";
  import JsonModal from "./jsonModal.svelte";
  import { openModal, openEditUser, currentUserData, selectedUserIds, userStore } from "../stores";
  import { onMount } from "svelte";
  import Alert from "./alert.svelte";
  export let firstName: string | undefined = undefined;
  export let lastName: string | undefined = undefined;
  export let email: string | undefined = undefined;
  export let userId: string | undefined = undefined;
  export let notes: string | undefined = undefined;
  let copyText = false;
  let allowOpen = true;
  let displayError = false;
  let display = false;

  export let checked: boolean;

  async function deleteUser() {
    let result = await fetch(`http://127.0.0.1:8080/user?id=${userId}`, {
      method: "DELETE",
    });

    if (result.ok) {
      console.log("Deleted user", userId);
      let removed = $userStore.filter((user) => {
        return user.id !== userId;
      });
      allowOpen = false;
      console.log(removed);
      userStore.set(removed);
      display = true;
      return;
    }

    console.error("Could not delete user", userId);
    displayError = true;
  }

  function addSelectedUser(id: string) {
    if ($selectedUserIds.includes(id)) {
      let removed = $selectedUserIds.filter((id) => {
        return id !== userId;
      });

      console.log("removed is", removed);

      selectedUserIds.set(removed);
      return;
    }
    selectedUserIds.update((ids) => {
      return [...ids, id];
    });
    console.log($selectedUserIds);
  }

  function openJsonModal() {
    currentUserData.set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      notes: notes,
      id: userId,
    });
    openModal.set(true);
  }

  function toggleEditUser() {
    currentUserData.set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      notes: notes,
      id: userId,
    });
    openEditUser.set(!$openEditUser);
  }

  let screenWidth = 0;
  onMount(() => {
    window.addEventListener("resize", () => {
      screenWidth = window.innerWidth;
    });
  });
</script>

<tr class="border-b-[1px]">
  <td class="w-5">
    <input
      type="checkbox"
      class="checkbox align-middle"
      checked={$selectedUserIds.includes(userId) ? true : false}
      on:click={() => {
        addSelectedUser(userId || "null");
      }}
    />
  </td>
  <td class="">
    <p>{firstName}</p>
  </td>
  <td class="">
    <p>{lastName}</p>
  </td>

  <td class="w-[25rem]">
    <button
      class="tooltip cursor-pointer"
      on:click={() => {
        navigator.clipboard.writeText(userId);
        copyText = true;
      }}
      data-tip={copyText ? "copied" : "copy"}
      on:mouseleave={() => {
        setTimeout(() => {
          copyText = false;
        }, 250);
      }}
    >
      <p class="kbd kbd-sm">{userId}</p>
    </button>
  </td>

  <td class="align-middle">
    <p>{email}</p>
  </td>
  <td class="align-middle">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="flex">
      <button
        class="hover:bg-base-300 p-1 rounded-lg cursor-pointer dropdown {screenWidth < 1500 ? 'dropdown-end' : ''} ml-auto"
        tabindex="0"
        on:click={() => {
          allowOpen = true;
        }}
      >
        <MoreIcon />
        {#if !($openModal || $openEditUser)}
          {#if allowOpen}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52 z-10 mt-3">
              <li><button on:click={toggleEditUser}>Edit User</button></li>
              <li>
                <button on:click={openJsonModal}>
                  <BracketsIcon width={"18px"} height={"18px"} strokeWidth={"2"} />
                  View JSON
                </button>
              </li>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <li on:click={deleteUser}>
                <button class="no_focus">
                  <TrashIcon width={"18px"} height={"18px"} strokeWidth={"2"} fill={"#F87272"} />
                  <p class="text-error">Delete</p>
                </button>
              </li>
            </ul>
          {/if}
        {/if}
      </button>
    </div>
  </td>
</tr>

<div class="flex justify-center fixed top-0 mx-auto right-[50%]">
  <Alert text="Could not delete user" bind:displayError type="alert-error" />
  <Alert text="Deleted User" bind:display type="alert-success" />
</div>

<style>
  td {
    padding: 1rem;
  }
</style>
