<script lang="ts">
  import MoreIcon from "$lib/icons/more.svelte";
  import TrashIcon from "$lib/icons/trash.svelte";
  import BracketsIcon from "./icons/brackets.svelte";
  import JsonModal from "./jsonModal.svelte";
  import { openModal, openEditUser, currentUserData } from "../stores";
  import { onMount } from "svelte";
  export let firstName: string | undefined = undefined;
  export let lastName: string | undefined = undefined;
  export let email: string | undefined = undefined;
  export let userId: string | undefined = undefined;
  export let notes: string | undefined = undefined;
  let openModalState: boolean;
  let copyText = false;

  export let checked: boolean;

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
  openModal.subscribe((newState) => {
    openModalState = newState;
  });

  let openEditUserState: boolean;
  openEditUser.subscribe((newState) => {
    openEditUserState = newState;
  });

  function toggleEditUser() {
    currentUserData.set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      notes: notes,
      id: userId,
    })
    openEditUser.set(!openEditUserState);
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
    <input type="checkbox" class="checkbox align-middle" {checked} />
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
      <div class="hover:bg-base-300 p-1 rounded-lg cursor-pointer dropdown {screenWidth < 1500 ? 'dropdown-end' : ''} ml-auto" tabindex="0">
        <MoreIcon />
        {#if !(openModalState || openEditUserState)}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52 z-10 mt-3">
            <li><button on:click={toggleEditUser}>Edit</button></li>
            <li>
              <button on:click={openJsonModal}>
                <BracketsIcon width={"18px"} height={"18px"} strokeWidth={"2"} />
                View JSON
              </button>
            </li>
            <li class="focus:bg-blue-200">
              <button class="no_focus">
                <TrashIcon width={"18px"} height={"18px"} strokeWidth={"2"} fill={"#F87272"} />
                <p class="text-error">Delete</p>
              </button>
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </td>
</tr>

<style>
  td {
    padding: 1rem;
  }
</style>
