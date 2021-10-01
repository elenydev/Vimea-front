import { Notification } from "infrastructure/interfaces/Notification/notification";
import { createRoutine } from "utils/redux/routines";

export const setNotification = createRoutine<Notification>("setNotification");
export const setNotificationsManager = createRoutine<Notification>(
  "setNotificationsManager"
);
export const clearNotification = createRoutine<undefined>("clearNotification");
