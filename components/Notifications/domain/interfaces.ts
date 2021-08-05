import { Notification } from "infrastructure/interfaces/Notification/notification";
import NotificationsManager from "components/Notifications/NotificationsManager";

export interface NotificationsStore {
  notificationsManager: NotificationsManager;
  notification: Notification;
}
