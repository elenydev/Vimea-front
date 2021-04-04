import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import BackgroundWrapper from "@/../components/BackgroundWrapper";
import Navigation from "@/../components/Navigation/index";
import Hero from "@/../components/Hero/index";

const Home = React.memo(
  (): JSX.Element => {
    return (
      <>
        <Head>
          <title>Vimea</title>
        </Head>
        <BackgroundWrapper>
          <Navigation />
          <Hero />
        </BackgroundWrapper>
      </>
    );
  }
);

export default Home;
