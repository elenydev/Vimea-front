import { NotificationsStore } from "./interfaces";
import { NotificationVariant } from "infrastructure/enums/Notification/notification";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import {
  clearNotifications,
  setNotifications,
  setNotificationsManager,
} from "./actions";

const initialState: NotificationsStore = {
  notificationsManager: undefined,
  notification: {
    message: "",
    shouldOpen: false,
    variant: NotificationVariant.ERROR,
  },
};

const notificationsStore = createSliceWithSaga({
  name: "notificationsStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setNotificationsManager, (state: NotificationsStore, action) => {
        state.notificationsManager = action.payload;
      })
      .addCase(setNotifications, (state: NotificationsStore, action) => {
        state.notification = action.payload;
      })
      .addCase(clearNotifications, (state: NotificationsStore, action) => {
        state.notification = {
          message: "",
          shouldOpen: false,
          variant: NotificationVariant.ERROR,
        };
      });
  },
  reducers: {},
});

export default notificationsStore.reducer;
