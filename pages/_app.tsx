import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Store from "store/configureStore";
import Layout from "layout/Layout";
import rootSaga from "store/sagas";
import { getCookie } from "services/cookieService";
import { CURRENT_USER_EMAIL_COOKIE, USER_COOKIE } from "utils/constants";
import { PROTECTED_ROUTES } from "routes";
import { getCurrentUser, setUserManager } from "components/App/domain/actions";
import UserManager from "managers/UserManager/UserManager";
import NotificationsManager from "components/Notifications/NotificationsManager";
import { Store as StoreInterface } from "store/interfaces";
import { setNotificationsManager } from "components/Notifications/domain/actions";
import Navigation from "components/Navigation/index";
import Router from "next/router";

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import "swiper/components/pagination/pagination.min.css"

Store.runSaga(rootSaga);

function MyApp({ Component, pageProps }): JSX.Element {
  const currentRoutePath = typeof window !== "undefined" ? window.location.href : "";
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => currentRoutePath.includes(route)
  );
  const userManager = (Store.getState() as StoreInterface).userStore
    ?.manager;
  const currentUser = (Store.getState() as StoreInterface).userStore?.user;
  const notificationsManager = (Store.getState() as StoreInterface)
    .notificationsStore?.notificationsManager;

  useEffect(() => {
    const currentUserToken = getCookie(USER_COOKIE);
    const currentUserEmail = getCookie(CURRENT_USER_EMAIL_COOKIE);

    if (!userManager) {
      Store.dispatch(setUserManager(new UserManager()));
    }

    if (!notificationsManager) {
      Store.dispatch(setNotificationsManager(new NotificationsManager()));
    }

    if (currentUserToken && currentUserEmail && !currentUser) {
      Store.dispatch(getCurrentUser.trigger({email: currentUserEmail}))
    }

    if (!currentUserToken) {
      if (isProtectedRoute) {
        Router.push('/')
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
