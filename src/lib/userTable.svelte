<script lang="ts">
  import JsonModal from "./jsonModal.svelte";
  import UserRow from "./userRow.svelte";
  import { openAddUser, selectedUserIds, userStore } from "../stores";
  import MoreIcon from "./icons/more.svelte";
  import SearchIcon from "./icons/search.svelte";
  import UserIcon from "./icons/user.svelte";
  import { convertToShortForm } from "../services/convertToShortForm";
  import RightArrowIcon from "./icons/rightArrow.svelte";
  import LeftArrowIcon from "./icons/leftArrow.svelte";
  import type { PageData } from "../routes/$types";
  import { onMount } from "svelte";
  import TrashIcon from "./icons/trash.svelte";
  import { deleteUser } from "../services/deleteUser";
  let searchValue: string;
  let timeout: NodeJS.Timeout;
  let originalPageUsers: number;
  let selectedUsersPage: number;
  let selected: boolean = false;
  let searchFocus: boolean = false;

  export let data: PageData;
  // TODO: Rename to allUsers
  let users;
  users = data.users;
  originalPageUsers = users;
  userStore.set(data.users);

  let offset = 10;
  let pageSize = 4;

  async function deleteUsers() {
    // let result = await deleteUser()
    let result = await deleteUser({users: $selectedUserIds });
    console.log(result)
    // remove ids that were in selecteduserIds
    let removed = $userStore.filter((user) => {
      if ($selectedUserIds.includes(user.id)) {
        console.log(user.id)
        return false
      } else {
        return true
      }
    }) 

    selectedUserIds.set([])
    userStore.set(removed)
  }

  async function switchPage(idx: number) {
    if (selectedUsersPage !== currentPage) {
      selected = false;
    } else {
      selected = true;
    }
    try {
      let response = await fetch(`http://127.0.0.1:8080/users?offset=${idx * offset}`);
      response = await response.json();
      // data = users;
      users = response.users;
      userStore.set(users);
    } catch (error) {
      users = null;
      console.error(error);
    }
  };

  const totalPages = Math.ceil(data.total / 10);
  let currentPage = 0;
  let pageArray = Array.from({ length: 5 }, (_, idx) => {
    return idx;
  });

  async function searchHandler(event: KeyboardEvent) {
    if (event.key === "Enter" && searchFocus) {
      if (searchValue) {
        let result = await fetch(`http://127.0.0.1:8080/search?value=${searchValue}`);
        if (result.ok) {
          result = await result.json();
          userStore.set(result);
          return;
        }
        return;
      } else {
        userStore.set(originalPageUsers);
      }
    }
  }

  onMount(() => {
    document.addEventListener("keydown", searchHandler);
  });

  async function searchUsers() {
    // If user types again clear the timeout, but if the user does not type after 300ms then the setTimeout will not be cleared and then run
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      if (searchValue) {
        let result = await fetch(`http://127.0.0.1:8080/search?value=${searchValue}`);
        if (result.ok) {
          result = await result.json();
          console.log(result);
          userStore.set(result);
          return;
        }
        return;
      } else {
        userStore.set(originalPageUsers);
      }
    }, 300);
  }

  function generatePageArray(type: string) {
    pageArray = pageArray.map((num) => {
      if (type == "increase" && pageArray[pageArray.length - 1] + 1 <= totalPages) {
        return num + pageSize;
      } else if (type === "decrease" && pageArray[0] !== 0) {
        return num - pageSize;
      } else {
        return num;
      }
    });
  }

  function selectAllUsersOnPage() {
    if (selected) {
      selectedUserIds.set([]);
      selected = !selected;
      selectedUsersPage = null;
      return;
    }

    console.log($userStore);
    let ids = $userStore.map((user) => user.id);
    selectedUserIds.set(ids);
    selected = !selected;
    selectedUsersPage = currentPage;
    return;
  }

  let shadow = false;
  // let openAddUserState: boolean;
  let checked: boolean = false;
  // let iconFill = "#000"
  //on:mouseover={() => {iconFill = "#FFF"}} on:mouseleave={() => {iconFill = "#000"}}
  export let addUserButton: HTMLElement;
</script>

<div class="flex flex-col justify-center items-center">
  <div class="flex w-full items-center">
    <button class="btn hover:shadow-md" on:click={() => openAddUser.set(!$openAddUser)} bind:this={addUserButton}>
      <UserIcon />
      Add User
    </button>
    <button class="btn hover:shadow-md ml-2 text-[#F87272]" on:click={deleteUsers}>
      <TrashIcon fill="#F87272" />
    </button>
    <div
      class="flex items-center border border-[1.5px] border-gray-200 p-1 rounded-xl w-[80%] md:w-[19rem] lg:w-[23rem] ml-auto {shadow
        ? 'shadow-md'
        : ''} ease-in duration-150 transition-shadow ml-auto"
    >
      <div class="ml-2">
        <SearchIcon fill={"#6b7280"} />
      </div>
      <input
        class="px-4 h-10 rounded-md focus:outline-none text-gray-500 w-full"
        type="text"
        placeholder="Search"
        bind:value={searchValue}
        on:input={searchUsers}
        on:focus={() => {
          shadow = true;
          searchFocus = true;
        }}
        on:focusout={() => {
          shadow = false;
          searchFocus = false;
        }}
      />
    </div>
  </div>
  <div class="badge mt-10">Total Users: <span class="text-blue-500">&nbsp;{convertToShortForm(data.total)}</span></div>

  <table class="mt-5 w-full">
    <thead class="">
      <tr class="border-b-[1px]">
        <th class="text-left align-middle py-2">
          <input type="checkbox" class="checkbox align-middle" on:click={selectAllUsersOnPage} bind:checked={selected} />
        </th>
        <th class="text-left text-sm text-gray-500">First Name</th>
        <th class="text-left text-sm text-gray-500">Last Name</th>
        <th class="text-left text-sm text-gray-500">User Id</th>
        <th class="text-left text-sm text-gray-500">Email</th>
      </tr>
    </thead>
    <tbody>
      {#each $userStore as user}
        <UserRow bind:checked firstName={user.firstName} lastName={user.lastName} userId={user.id} email={user.email} notes={user.notes} />
      {/each}
    </tbody>
  </table>
  <div class="self-center mt-10">
    <div class="join">
      <button class="join-item btn btn-sm" on:click={() => generatePageArray("decrease")}>
        <LeftArrowIcon width="16px" />
      </button>

      {#each pageArray.slice(0, pageSize) as num}
        {#if num < totalPages}
          <button
            class={num == currentPage ? "join-item btn btn-sm bg-base-300" : "join-item btn btn-sm"}
            on:click={() => {
              currentPage = num;
              switchPage(num);
            }}>{num + 1}</button
          >
        {/if}
      {/each}
      <button class="join-item btn btn-sm" on:click={() => generatePageArray("increase")}>
        <RightArrowIcon width="16px" />
      </button>
    </div>
  </div>
</div>

<style>
  th {
    padding: 1rem;
  }
</style>
