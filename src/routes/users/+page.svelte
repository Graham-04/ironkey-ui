<script lang="ts">
  import AddUserSidebar from "$lib/addUserSidebar.svelte";
  import UserTable from "$lib/userTable.svelte";
  import JsonModal from "$lib/jsonModal.svelte";
  import IsAuthenticated from "$lib/isAuthenticated.svelte";
  import EditUserSidebar from "$lib/editUserSidebar.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let addUserButton: HTMLElement;
</script>

<IsAuthenticated>
  <JsonModal />
  <div class="w-full lg:w-[70%] xl:w-[70%] mx-auto mt-20">
    <AddUserSidebar {addUserButton} />
    <EditUserSidebar />
    <UserTable bind:addUserButton data={data}/>
  </div>
</IsAuthenticated>
