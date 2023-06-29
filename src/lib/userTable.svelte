<script lang="ts">
  import JsonModal from "./jsonModal.svelte";
  import UserRow from "./userRow.svelte";
  import { openAddUser, userStore } from "../stores";
  import MoreIcon from "./icons/more.svelte";
  import SearchIcon from "./icons/search.svelte";
  import UserIcon from "./icons/user.svelte";
  import { convertToShortForm } from "../services/convertToShortForm";
  import RightArrowIcon from "./icons/rightArrow.svelte";
  import LeftArrowIcon from "./icons/leftArrow.svelte";
  import type { PageData } from "../routes/$types";
  export let data: PageData;
  // TODO: Rename to allUsers
  let users;
  users = data.users;
  userStore.set(data.users)

  userStore.subscribe((newState) => {
    if (newState.length === 0) {
      return;
    }
    users = newState;
  });

  let offset = 10;
  let pageSize = 4;
  const switchPage = async (idx: number) => {
    try {
      let response = await fetch(`http://127.0.0.1:8080/users?offset=${idx * offset}`);
      response = await response.json();
      // data = users;
      users = response.users
      userStore.set(users);
    } catch (error) {
      users = null;
      console.error(error);
    }
  };

  const totalPages = Math.ceil(data.total / 10);
  console.log("totalPages: ", totalPages);
  let currentPage = 0;
  let pageArray = Array.from({ length: 5 }, (_, idx) => {
    return idx;
  });

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

  let shadow = false;
  let openAddUserState: boolean;
  let checked: boolean = false;
  // let iconFill = "#000"
  //on:mouseover={() => {iconFill = "#FFF"}} on:mouseleave={() => {iconFill = "#000"}}
  export let addUserButton: HTMLElement;
  openAddUser.subscribe((newState) => {
    console.log("new state", newState);
    openAddUserState = newState;
  });
</script>

<div class="flex flex-col justify-center items-center">
  <div class="flex w-full items-center">
    <button class="btn hover:shadow-lg" on:click={() => openAddUser.set(!openAddUserState)} bind:this={addUserButton}>
      <UserIcon />
      Add User
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
        on:focus={() => {
          shadow = true;
        }}
        on:focusout={() => {
          shadow = false;
        }}
      />
    </div>
  </div>
  <div class="badge mt-10">Total Users: <span class="text-blue-500">&nbsp;{convertToShortForm(data.total)}</span></div>

  <table class="mt-5 w-full">
    <thead class="">
      <tr class="border-b-[1px]">
        <th class="text-left align-middle py-2">
          <input type="checkbox" class="checkbox align-middle" on:click={() => (checked = !checked)} {checked} />
        </th>
        <th class="text-left text-sm text-gray-500">First Name</th>
        <th class="text-left text-sm text-gray-500">Last Name</th>
        <th class="text-left text-sm text-gray-500">User Id</th>
        <th class="text-left text-sm text-gray-500">Email</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
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