import { Notification } from "infrastructure/interfaces/Notification/notification";
import { createRoutine } from "utils/redux/routines";
import NotificationsManager from "components/Notifications/NotificationsManager";

export enum NotificationsRoutines {
  SetNotification = "setNotification",
  SetNotificationsManager = "setNotificationsManager",
  ClearNotification = "clearNotification",
}

export const setNotification = createRoutine<Notification>(
  NotificationsRoutines.SetNotification
);
export const setNotificationsManager = createRoutine<NotificationsManager>(
  NotificationsRoutines.SetNotificationsManager
);
export const clearNotification = createRoutine<undefined>(
  NotificationsRoutines.ClearNotification
);
