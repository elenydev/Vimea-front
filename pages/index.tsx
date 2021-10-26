import Head from "next/head";
import React, { useEffect } from "react";
import BackgroundWrapper from "components/BackgroundWrapper/BackgroundWrapper.server";
import Hero from "components/Hero/Hero.server";
import { getLatestMovies } from "repositories/movies/movies";
import { Movie } from "infrastructure/interfaces/Movie/movie";
import Store from "store/configureStore";
import { Store as StoreInterface } from "store/interfaces";
import { CircularProgress } from "@material-ui/core";
import { getMappedMovies } from "utils/getMappedMovies";
import dynamic from "next/dynamic";

const LatestSection = dynamic(() => import("components/LatestSection/LatestSection"), {
  loading: () => <CircularProgress color="secondary" />,
});

interface ComponentProps {
  upcomingMovies: Movie[];
}

const Home = ({ upcomingMovies }: ComponentProps): JSX.Element => {
  const movieManager = (Store.getState() as StoreInterface).movieStore?.manager;
  useEffect(() => {
    movieManager?.setUpcomingMovies(upcomingMovies);
  }, [upcomingMovies, movieManager]);

  return (
    <>
      <Head>
        <title>Vimea</title>
      </Head>
      <BackgroundWrapper>
        <Hero />
        {Boolean(upcomingMovies.length) && (
          <LatestSection upcomingMovies={upcomingMovies} />
        )}
      </BackgroundWrapper>
    </>
  );
};

export async function getServerSideProps() {
  const movieRequest = await getLatestMovies();
  const upcomingMovies = getMappedMovies(movieRequest);
  return {
    props: {
      upcomingMovies,
    },
  };
}

export default React.memo(Home);
