import { NotificationVariant } from "../../enums/Notification/notification";

export interface Notification {
  message: string;
  shouldOpen: boolean;
  variant: NotificationVariant;
}
