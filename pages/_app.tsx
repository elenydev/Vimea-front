import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/../store/configureStore";
import Layout from "@/../layout/Layout";
import rootSaga from "@/../store/sagas";
import { getCookie } from "../services/cookieService";
import { USER_COOKIE } from "../constants";
import { useRouter } from "next/router";
store.runSaga(rootSaga);

function MyApp({ Component, pageProps }): JSX.Element {
  const router = useRouter();
  const authSignInPath = "/auth/signIn";
  const authSignUpPath = "/auth/signUp";
  const isInAuthRoute =
    router.pathname === authSignInPath || router.pathname === authSignUpPath;

  useEffect(() => {
    const currentUser = getCookie(USER_COOKIE);
    if (!currentUser) {
      if (!isInAuthRoute) {
        router.replace("/");
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
