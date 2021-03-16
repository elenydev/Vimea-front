import { Notification } from "@/../infrastructure/interfaces/Notification/notification";
import NotificationsManager from "../NotificationsManager";

export interface NotificationsStore {
  notificationsManager: NotificationsManager;
  notification: Notification;
}
