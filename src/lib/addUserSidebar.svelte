<script lang="ts">
  import CloseIcon from "./icons/close.svelte";
  import { openAddUser } from "../stores";
  import { onMount } from "svelte";
  import EyeIcon from "./icons/eye.svelte";
  import Alert from "$lib/alert.svelte";
  import ClosedEyeIcon from "./icons/closedEye.svelte";
  export let addUserButton: HTMLElement;
  let eyeStatus = true;
  let firstName: HTMLInputElement;
  let lastName: HTMLInputElement;
  let email: HTMLInputElement;
  let notes: HTMLTextAreaElement;
  let password: HTMLInputElement;
  let openAddUserState: boolean;
  let openAddUserHTML: HTMLElement;
  let display: boolean = false;
  let displayError: boolean = false;
  let errorMessage: string = "Could not add user";
  openAddUser.subscribe((newState) => {
    openAddUserState = newState;
  });

  async function addUser() {
    const result: Response = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        password: password.value,
        email: email.value,
        notes: notes.value,
      }),
    });

    // display = true
    if (result.ok) {
      // Display user added
      display = true;
      firstName.value = "";
      lastName.value = "";
      password.value = "";
      email.value = "";
      notes.value = "";
      openAddUser.set(false);
      return;
    } else if (result.status === 409) {
      errorMessage = "Duplicate Email";
      displayError = true;
      return;
    } else {
      displayError = true;
      return;
    }
  }

  function generatePassword() {
    const length = 15; // Length of the generated password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#()"; // Characters to include in the password
    let _password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      _password += charset[randomIndex];
    }
    password.value = _password;
  }

  function toggleAddUser() {
    openAddUser.set(!openAddUserState);
  }
  // export let openSideBar: boolean;

  function handler(event: MouseEvent) {
    if (openAddUserState && !openAddUserHTML.contains(event.target as Node) && addUserButton && !addUserButton.contains(event.target as Node)) {
      console.log("clicked outside");
      openAddUser.set(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      openAddUser.set(false);
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

<div class={`${openAddUserState ? "open" : "closed"} flex flex-col p-4 items-center h-[100vh] bg-base-100 fixed bottom-0 right-0 w-full md:w-[30rem] shadow-lg z-20`} bind:this={openAddUserHTML}>
  <button
    class="ml-auto p-1 ease-in transition-all hover:bg-base-200 rounded-lg cursor-pointer outline-2 outline-transparent focus:outline-base-300"
    on:click={toggleAddUser}
    tabindex={openAddUserState ? 1 : -1}
  >
    <CloseIcon />
  </button>
  <h1 class="prose-xl">Add User 👤</h1>
  <p class="mb-5 text-gray-400 select-none text-xs">* ID will be auto generated</p>
  <div class="flex w-full gap-3">
    <input type="text" class="input input-bordered w-full select-none" placeholder="First Name" bind:this={firstName} tabindex={openAddUserState ? 1 : -1} />
    <input type="text" class="input input-bordered w-full select-none" placeholder="Last Name" bind:this={lastName} tabindex={openAddUserState ? 1 : -1} />
  </div>
  <div class="w-full">
    <input type="text" class="input input-bordered w-full mt-5 select-none" placeholder="Email ✉️" bind:this={email} tabindex={openAddUserState ? 1 : -1} />
  </div>
  <div class="relative w-full">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="absolute bottom-[42%] right-[3%] cursor-pointer rounded-md"
      on:click={() => {
        eyeStatus = !eyeStatus;
      }}
    >
      {#if eyeStatus}
        <ClosedEyeIcon width="25px" fill="#9ca3af" />
      {:else}
        <EyeIcon width="25px" fill="#9ca3af" />
      {/if}
    </div>
    <input type={eyeStatus ? "password" : "text"} class="input input-bordered w-full mt-5 select-none" placeholder="Password 🔒" bind:this={password} tabindex={openAddUserState ? 1 : -1} />
    <div class="flex">
      <button class="btn btn-xs font-normal normal-case rounded-lg mt-2 ml-auto" on:click={generatePassword} tabindex={openAddUserState ? 1 : -1}>Generate</button>
    </div>
  </div>
  <textarea class="textarea textarea-bordered w-full mt-5 select-none" name="" id="" cols="30" rows="5" placeholder="Notes 📝" bind:this={notes} tabindex={openAddUserState ? 1 : -1} />
  <button class="btn w-full mt-5 hover:bg-[#51cf94] hover:shadow-lg hover:text-white" on:click={addUser} tabindex={openAddUserState ? 1 : -1}>Add User ➕</button>
</div>
<Alert type="alert-success" text={"User Added"} bind:display />
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
