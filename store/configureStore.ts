import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userStore from "components/User/domain/reducers";
import notificationsStore from "components/Notifications/domain/reducers";
import movieStore from "managers/MovieManager/reducers";
import formStore from "managers/FormManager/reducers";
import createSagaMiddleware from "redux-saga";
import userSagas from "components/User/domain/sagas";


let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userStore,
    notificationsStore,
    movieStore,
    formStore,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSagas);

export default store;
