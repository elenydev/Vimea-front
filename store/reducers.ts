import userStore from "components/User/domain/reducers";
import notificationsStore from "components/Notifications/domain/reducers";
import movieStore from 'managers/MovieManager/reducers';
import formStore from 'managers/FormManager/reducers';
import { combineReducers } from "redux";

export default () =>
  combineReducers({
    userStore,
    notificationsStore,
    movieStore,
    formStore
  });
