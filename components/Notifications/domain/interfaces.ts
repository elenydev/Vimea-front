import { Notification } from "infrastructure/interfaces/Notification/notification";
import NotificationsManager from "managers/NotificationsManager/NotificationsManager";

export interface NotificationsStore {
  notificationsManager: NotificationsManager;
  notification: Notification;
}
