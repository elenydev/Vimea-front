import { Store } from "store/interfaces";

export const getNotification = (state: Store) =>
  state.notificationsStore.notification;
export const getNotificationManager = (state: Store) =>
  state.notificationsStore.notificationsManager;
