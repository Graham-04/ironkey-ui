import { writable } from "svelte/store";
export const openModal = writable(false);
export const openAddUser = writable(false);
export const openEditUser = writable(false);
export const currentUserData = writable({});
export const userStore = writable([]);