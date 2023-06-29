<script>
  import SettingsIcon from "$lib/icons/settings.svelte";
</script>

<nav class="nav flex items-center py-6 w-full lg:w-[80%] mx-auto">
  <div class="dropdown">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label
      tabindex="0"
      class="p-2 border border-[1px] cursor-pointer rounded-lg m-1 text-neutral text-sm"
      >Current Workspace</label
    >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2.5"
    >
      <li>
        <a href="/">Workspace #1</a>
      </li>
      <li>
        <a href="/">Workspace #2</a>
      </li>
    </ul>
  </div>
  <div class="right_side ml-auto flex gap-4">
    <a href="/users" class="link">Users</a>
    <!-- <a href="/settings" class="">
      <SettingsIcon />
    </a> -->
  </div>
</nav>
