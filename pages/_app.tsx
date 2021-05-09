import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Store from "@/../store/configureStore";
import Layout from "@/../layout/Layout";
import rootSaga from "@/../store/sagas";
import { getCookie } from "@/../../services/cookieService";
import { CURRENT_USER_EMAIL, USER_COOKIE } from "@/../../constants";
import { PROTECTED_ROUTES } from "@/../../routes";
import RouterInstance from "@/../utils/routerInstance";
import { RedirectTo } from "@/../utils/redirectTo";
import { setUserManager } from "@/../components/App/domain/actions";
import UserManager from "@/../components/App/UserManager";
import NotificationsManager from "@/../components/Notifications/NotificationsManager";
import { Store as StoreInterface } from "../store/interfaces";
import { setNotificationsManager } from "../components/Notifications/domain/actions";

Store.runSaga(rootSaga);

function MyApp({ Component, pageProps }): JSX.Element {
  const currentRoutePath = RouterInstance().pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => route === currentRoutePath
  );
  const userManager = (Store.getState() as StoreInterface).userStore
    ?.userManager;
  const currentUser = (Store.getState() as StoreInterface).userStore?.user;
  const notificationsManager = (Store.getState() as StoreInterface)
    .notificationsStore?.notificationsManager;

  useEffect(() => {
    if (!userManager) {
      Store.dispatch(setUserManager(new UserManager()));
    }
    if (!notificationsManager) {
      Store.dispatch(setNotificationsManager(new NotificationsManager()));
    }
  }, []);

  useEffect(() => {
    const currentUserToken = getCookie(USER_COOKIE);
    const currentUserEmail = getCookie(CURRENT_USER_EMAIL);
    if (userManager && currentUserToken && currentUserEmail) {
      userManager.getCurrentUser({ email: currentUserEmail });
    }
    if (!currentUser) {
      if (isProtectedRoute) {
        RedirectTo(RouterInstance());
      }
    }
  }, [currentUser, userManager]);
  return (
    <>
      <Provider store={Store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
