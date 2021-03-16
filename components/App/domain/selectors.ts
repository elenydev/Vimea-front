import { Store } from "@/../store/interfaces";

export const getUser = (state: Store) => state.userState.user;
export const getUserManager = (state: Store) => state.userState.userManager;
