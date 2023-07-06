<script lang="ts">
  import CloseIcon from "./icons/close.svelte";
  import { openEditUser, currentUserData, userStore } from "../stores";
  import { onMount } from "svelte";
  import Alert from "./alert.svelte";
  let editUserHTML: HTMLElement;
  let firstName: HTMLInputElement;
  let lastName: HTMLInputElement;
  let email: HTMLInputElement;
  let notes: HTMLTextAreaElement;
  let displaySuccess: boolean = false;
  let displayError: boolean = false;
  let errorMessage: string = "Could not update user";

  async function updateUser() {
    const newUserData = {
      id: $currentUserData.id,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      notes: notes.value || null,
    };
    try {
      let result = await fetch("http://127.0.0.1:8080/user", {
        method: "PATCH",
        body: JSON.stringify(newUserData),
      });
      if (result.ok) {
        displaySuccess = true;
        openEditUser.set(false);
        let editedUser = $userStore.find((user) => {
          console.log($currentUserData.id, user.id);
          if ($currentUserData.id === user.id) {
            return true;
          }
        });

        if (editedUser) {
          // Update the found user with new data
          editedUser.email = email.value;
          editedUser.firstName = firstName.value;
          editedUser.lastName = lastName.value;
          editedUser.notes = notes.value;
        }

        // Update userStore with the new data
        userStore.set($userStore);

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
    openEditUser.set(!$openEditUser);
  }

  function handler(event: MouseEvent) {
    if ($openEditUser && !editUserHTML.contains(event.target as Node)) {
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

<div class={`${$openEditUser ? "open" : "closed"} flex flex-col p-4 items-center h-[100vh] bg-base-100 fixed bottom-0 right-0 w-full md:w-[30rem] shadow-lg z-20`} bind:this={editUserHTML}>
  <button
    class="ml-auto p-1 ease-in transition-all hover:bg-base-200 rounded-lg cursor-pointer outline-2 outline-transparent focus:outline-base-300"
    on:click={toggleEditUser}
    tabindex={$openEditUser ? 1 : -1}
  >
    <CloseIcon />
  </button>
  <h1 class="prose-xl mb-5">Edit User ⚠️</h1>
  <div class="flex w-full gap-3">
    <input type="text" class="input input-bordered w-full" placeholder="First Name" value={$currentUserData.firstName} tabindex={$openEditUser ? 1 : -1} bind:this={firstName} />
    <input type="text" class="input input-bordered w-full" placeholder="Last Name" value={$currentUserData.lastName} tabindex={$openEditUser ? 1 : -1} bind:this={lastName} />
  </div>
  <div class="w-full">
    <input type="text" class="input input-bordered w-full mt-5" placeholder="Email ✉️" value={$currentUserData.email} tabindex={$openEditUser ? 1 : -1} bind:this={email} />
  </div>
  <textarea class="textarea textarea-bordered w-full mt-5" name="" id="" cols="30" rows="5" value={$currentUserData.notes} placeholder="Notes 📝" tabindex={$openEditUser ? 1 : -1} bind:this={notes} />
  <button class="btn w-full mt-3 hover:bg-[#ffd43b] hover:shadow-sm border-0" tabindex={$openEditUser ? 1 : -1} on:click={updateUser}>Update</button>
  <p class="text-red-600 text-sm mt-1.5 {displayError ? 'block' : 'hidden'}">Error updating user</p>
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
