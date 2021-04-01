import { Notification } from "@/../infrastructure/interfaces/Notification/notification";
import { createAction } from "@/../utils/Redux/index";

export const setNotification = createAction<Notification>("setNotification");
export const setNotificationsManager = createAction<Notification>(
  "setNotificationsManager"
);
export const clearNotification = createAction<undefined>("clearNotification");
