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
import { getCurrentUser, setUserManager } from "@/../components/App/domain/actions";
import UserManager from "@/../components/App/UserManager";
import NotificationsManager from "@/../components/Notifications/NotificationsManager";
import { Store as StoreInterface } from "@/../store/interfaces";
import { setNotificationsManager } from "../components/Notifications/domain/actions";
import Navigation from "@/../components/Navigation/index";

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
    const currentUserToken = getCookie(USER_COOKIE);
    const currentUserEmail = getCookie(CURRENT_USER_EMAIL);

    if (!userManager) {
      Store.dispatch(setUserManager(new UserManager()));
    }

    if (!notificationsManager) {
      Store.dispatch(setNotificationsManager(new NotificationsManager()));
    }

    if (currentUserToken && currentUserEmail && !currentUser) {
      Store.dispatch(getCurrentUser.trigger({email: currentUserEmail}))
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
          <Navigation />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
