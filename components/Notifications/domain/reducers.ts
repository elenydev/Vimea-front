import { createReducer } from "deox";
import * as actions from "components/Notifications/domain/routines";
import { NotificationsStore } from "./interfaces";
import { NotificationVariant } from "infrastructure/enums/Notification/notification";

const initialState: NotificationsStore = {
  notificationsManager: undefined,
  notification: {
    message: "",
    shouldOpen: false,
    variant: NotificationVariant.ERROR,
  },
};

const notificationsReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.setNotificationsManager.trigger, (state, { meta }) => {
    return {
      ...state,
      notificationsManager: meta,
    };
  }),
  handleAction(actions.setNotification.trigger, (state, { meta }) => {
    return {
      ...state,
      notification: meta,
    };
  }),
  handleAction(actions.clearNotification.trigger, (state) => {
    return {
      ...state,
      notification: {
        message: "",
        shouldOpen: false,
        variant: NotificationVariant.ERROR,
      },
    };
  }),
]);

export default notificationsReducer;
