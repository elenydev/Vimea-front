import Head from "next/head";
import React from "react";

import BackgroundWrapper from "../components/BackgroundWrapper";

const Home = React.memo(
  (): JSX.Element => {
    return (
      <>
        <Head>
          <title>Vimea</title>
        </Head>
        <BackgroundWrapper>
          <h1>Starter</h1>
        </BackgroundWrapper>
      </>
    );
  }
);

export default Home;
