import { Provider } from "react-redux";
import store from "@/../store/configureStore";
import Layout from "@/../layout/Layout";
import rootSaga from "@/../store/sagas";

store.runSaga(rootSaga);

function MyApp({ Component, pageProps }): JSX.Element {
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
