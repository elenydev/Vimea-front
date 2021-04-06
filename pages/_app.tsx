import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/../store/configureStore";
import Layout from "@/../layout/Layout";
import rootSaga from "@/../store/sagas";
import { getCookie } from "@/../../services/cookieService";
import { USER_COOKIE } from "@/../../constants";
import { PROTECTED_ROUTES } from "@/../../routes";
import RouterInstance from "@/../utils/routerInstance";
import { RedirectTo } from "../utils/redirectTo";

store.runSaga(rootSaga);

function MyApp({ Component, pageProps }): JSX.Element {
  const currentRoutePath = RouterInstance().pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => route === currentRoutePath
  );

  useEffect(() => {
    const currentUser = getCookie(USER_COOKIE);
    if (!currentUser) {
      if (isProtectedRoute) {
        RedirectTo(RouterInstance());
      }
    }
  }, []);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
