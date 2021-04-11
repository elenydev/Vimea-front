import { Action, handleActions } from "@/../utils/Redux";
import { ReducerMap } from "redux-actions";
import * as actions from "@/../components/Notifications/domain/actions";
import { NotificationsStore } from "./interfaces";
import NotificationsManager from "../NotificationsManager";
import { Notification } from "@/../infrastructure/interfaces/Notification/notification";
import { NotificationVariant } from "@/../infrastructure/enums/Notification/notification";

const initialState: NotificationsStore = {
  notificationsManager: undefined,
  notification: {
    message: "",
    shouldOpen: false,
    variant: NotificationVariant.ERROR,
  },
};

const reducerMap: ReducerMap<NotificationsStore, any> = {
  [actions.setNotificationsManager]: (
    state,
    action: Action<NotificationsManager>
  ): NotificationsStore => ({
    ...state,
    notificationsManager: action.payload,
  }),
  [actions.setNotification]: (
    state,
    action: Action<Notification>
  ): NotificationsStore => ({
    ...state,
    notification: action.payload,
  }),
  [actions.clearNotification]: (state): NotificationsStore => ({
    ...state,
    notification: {
      message: '',
      shouldOpen: false,
      variant: NotificationVariant.ERROR
    }
  }),
};

export default handleActions(reducerMap, initialState);
