import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userStore from "components/User/domain/reducers";
import notificationsStore from "components/Notifications/domain/reducers";
import movieStore from "managers/MovieManager/reducers";
import formStore from "managers/FormManager/reducers";
import createSagaMiddleware from "@redux-saga/core";
import { userStoreCallEffects } from "components/User/domain/reducers";
import { createRootSaga } from "redux-toolkit-with-saga";

const rootSaga = createRootSaga([userStoreCallEffects]);

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userStore,
    notificationsStore,
    movieStore,
    formStore,
  },
  middleware: [...getDefaultMiddleware({ serializableCheck: false}), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
