import * as NotificationsStoreActions from "components/Notifications/domain/actions";
import Store from "store/configureStore";
import { NotificationVariant } from "infrastructure/enums/Notification/notification";

export default class NotificationsManager {
  public setSuccesfullNotifications(message: string): void {
    Store.dispatch(
      NotificationsStoreActions.setNotifications({
        message,
        shouldOpen: true,
        variant: NotificationVariant.SUCCESS,
      })
    );
  }

  public setErrorNotifications(message: string): void {
    Store.dispatch(
      NotificationsStoreActions.setNotifications({
        message,
        shouldOpen: true,
        variant: NotificationVariant.ERROR,
      })
    );
  }

  public clearNotification(): void {
    Store.dispatch(NotificationsStoreActions.clearNotifications());
  }
}
