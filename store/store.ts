import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../reducers/notifications-slice";
export default configureStore({
  reducer: {
    notification: notificationsReducer,
  },
});
