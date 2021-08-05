import { NotificationVariant } from "infrastructure/enums/Notification/notification";

export interface Notification {
  message: string;
  shouldOpen: boolean;
  variant: NotificationVariant;
}
