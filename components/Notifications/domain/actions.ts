import { createAction } from "@reduxjs/toolkit";
import { Notification } from "infrastructure/interfaces/Notification/notification";
import NotificationsManager from "components/Notifications/NotificationsManager";

export enum NotificationsStoreActions {
  SetNotificationsManager = "notificationsStore/setNotificationsManager",
  SetNotifications = "notificationsStore/setNotifications",
  ClearNotifications = "notificationsStore/ClearNotifications",
}

export const setNotificationsManager = createAction<NotificationsManager>(
  NotificationsStoreActions.SetNotificationsManager
);
export const setNotifications = createAction<Notification>(
  NotificationsStoreActions.SetNotifications
);
export const clearNotifications = createAction(
  NotificationsStoreActions.ClearNotifications
);
