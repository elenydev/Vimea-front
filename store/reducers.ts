import userStore from "@/../components/App/domain/reducers";
import notificationsStore from "@/../components/Notifications/domain/reducers";
import movieStore from '@/../managers/MovieManager/reducers';
import { combineReducers } from "redux";

export default () =>
  combineReducers({
    userStore,
    notificationsStore,
    movieStore
  });
