import { writable } from "svelte/store";
export const openModal = writable(false);
export const openAddUser = writable(false);
export const openEditUser = writable(false);
export const currentUserData = writable({});
// current users for the current page
export const userStore = writable([]);
export const selectedUserIds = writable([]);