import React, { useEffect, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import Store from "store/configureStore";
import Layout from "layout/Layout";
import { getCookie } from "services/cookieService";
import { CURRENT_USER_ID, USER_COOKIE } from "contants";
import { PROTECTED_ROUTES } from "routes";
import {
  setUserManager,
  getCurrentUserTrigger,
} from "components/User/domain/actions";
import UserManager from "managers/UserManager/UserManager";
import NotificationsManager from "managers/NotificationsManager/NotificationsManager";
import { Store as StoreInterface } from "store/interfaces";
import { setNotificationsManager } from "components/Notifications/domain/actions";
import Navigation from "components/Navigation/index";
import Router from "next/router";
import { CircularProgress, Box } from "@material-ui/core";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";

function MyApp({ Component, pageProps }): JSX.Element {
  const currentRoutePath =
    typeof window !== "undefined" ? window.location.href : "";
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    currentRoutePath.includes(route)
  );
  const userManager = (Store.getState() as StoreInterface).userStore?.manager;
  const currentUser = (Store.getState() as StoreInterface).userStore?.user;
  const notificationsManager = (Store.getState() as StoreInterface)
    .notificationsStore?.notificationsManager;
  const currentUserToken = getCookie(USER_COOKIE);
  const currentUserId = getCookie(CURRENT_USER_ID);

  useEffect(() => {
    if (!currentUser) {
      if (isProtectedRoute && !currentUserToken) {
        Router.push("/");
      }
    }

    if (!userManager) {
      Store.dispatch(setUserManager(new UserManager()));
    }

    if (!notificationsManager) {
      Store.dispatch(setNotificationsManager(new NotificationsManager()));
    }

    if (currentUserToken && currentUserId && !currentUser) {
      Store.dispatch(getCurrentUserTrigger({ userId: currentUserId }));
    }
  }, [currentUser, userManager]);

  return (
    <>
      <Provider store={Store}>
        {isProtectedRoute && !currentUser && !currentUserToken ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <Layout>
            <Navigation />
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </>
  );
}

export default MyApp;
