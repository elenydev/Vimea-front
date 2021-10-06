import { createAction } from "@reduxjs/toolkit";
import { Notification } from "infrastructure/interfaces/Notification/notification";
import NotificationsManager from "managers/NotificationsManager/NotificationsManager";

export enum NotificationsStoreActions {
  SetNotificationsManager = "notificationsStore/setNotificationsManager",
  SetNotifications = "notificationsStore/setNotifications",
  ClearNotifications = "notificationsStore/clearNotifications",
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
