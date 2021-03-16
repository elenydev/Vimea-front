import userStore from "@/../components/App/domain/reducers";
import notificationsStore from "@/../components/Notifications/domain/reducers";
import { combineReducers } from "redux";

export default () =>
  combineReducers({
    userStore,
    notificationsStore,
  });
