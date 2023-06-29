<script lang="ts">
  import CloseIcon from "./icons/close.svelte";
  import { openEditUser, currentUserData, userStore } from "../stores";
  import { onMount } from "svelte";
  import Alert from "./alert.svelte";
  let openEditUserState: boolean;
  let editUserHTML: HTMLElement;
  let userData;
  let firstName: HTMLInputElement;
  let lastName: HTMLInputElement;
  let email: HTMLInputElement;
  let notes: HTMLTextAreaElement;
  let displaySuccess: boolean = false;
  let displayError: boolean = false;
  let errorMessage: string = "Could not update user";
  let allUsers;

  userStore.subscribe((newState) => {
    console.log("new state in editusersidebar: ");
    allUsers = newState;
  });

  currentUserData.subscribe((newState) => {
    userData = newState;
  });

  openEditUser.subscribe((newState) => {
    openEditUserState = newState;
  });

  async function updateUser() {
    const newUserData = {
      id: userData.id,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      notes: notes.value,
    };
    try {
      console.log(newUserData);
      let result = await fetch("http://127.0.0.1:8080/user", {
        method: "PATCH",
        body: JSON.stringify(newUserData),
      });
      if (result.ok) {
        displaySuccess = true;
        openEditUser.set(false);
        console.log("userStore:", allUsers);
        let editedUser = allUsers.find((user) => {
          if (user.id === userData.id) {
            console.log("the edited user is: , ", user);
            return true;
          }
        });

        if (editedUser) {
          console.log("updating editedUser");
          editedUser.email = email.value;
          editedUser.firstName = firstName.value;
          editedUser.lastName = lastName.value;
        }

        userStore.set(allUsers);

        return;
      } else {
        displayError = true;
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function toggleEditUser() {
    openEditUser.set(!openEditUserState);
  }

  function handler(event: MouseEvent) {
    if (openEditUserState && !editUserHTML.contains(event.target as Node)) {
      console.log("clicked outside");
      openEditUser.set(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      openEditUser.set(false);
    }
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

<div class={`${openEditUserState ? "open" : "closed"} flex flex-col p-4 items-center h-[100vh] bg-base-100 fixed bottom-0 right-0 w-full md:w-[30rem] shadow-lg z-20`} bind:this={editUserHTML}>
  <button
    class="ml-auto p-1 ease-in transition-all hover:bg-base-200 rounded-lg cursor-pointer outline-2 outline-transparent focus:outline-base-300"
    on:click={toggleEditUser}
    tabindex={openEditUserState ? 1 : -1}
  >
    <CloseIcon />
  </button>
  <h1 class="prose-xl mb-5">Edit User ⚠️</h1>
  <div class="flex w-full gap-3">
    <input type="text" class="input input-bordered w-full" placeholder="First Name" value={userData.firstName} tabindex={openEditUserState ? 1 : -1} bind:this={firstName} />
    <input type="text" class="input input-bordered w-full" placeholder="Last Name" value={userData.lastName} tabindex={openEditUserState ? 1 : -1} bind:this={lastName} />
  </div>
  <div class="w-full">
    <input type="text" class="input input-bordered w-full mt-5" placeholder="Email ✉️" value={userData.email} tabindex={openEditUserState ? 1 : -1} bind:this={email} />
  </div>
  <textarea class="textarea textarea-bordered w-full mt-5" name="" id="" cols="30" rows="5" value={userData.notes} placeholder="Notes 📝" tabindex={openEditUserState ? 1 : -1} bind:this={notes} />
  <button class="btn w-full mt-3 hover:bg-[#ffd43b] hover:shadow-sm border-0" tabindex={openEditUserState ? 1 : -1} on:click={updateUser}>Update</button>
  <p class="text-red-600 text-sm mt-1.5 {displayError ? "block" : "hidden"}">Error updating user</p>
</div>
<Alert type="alert-success" text="Updated User" bind:display={displaySuccess} />
<Alert type="alert-error" text={errorMessage} bind:displayError />

<style>
  .open {
    transition: opacity 80ms ease-in, transform 80ms ease-in;
    opacity: 1;
    transform: translateX(0);
  }

  .closed {
    transition: all 80ms ease-in, transform 80ms ease-in;
    opacity: 0;
    transform: translateX(100%);
    pointer-events: none;
  }
</style>
