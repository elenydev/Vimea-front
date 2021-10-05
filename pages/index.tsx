import Head from "next/head";
import React, { useEffect } from "react";
import BackgroundWrapper from "components/BackgroundWrapper";
import Hero from "components/Hero/index";
import { getLatestMovies } from "repositories/movies/movies";
import { Movie } from "infrastructure/interfaces/Movie/movie";
import Store from "store/configureStore";
import { setMovieManager } from "managers/MovieManager/actions";
import MovieManager from "managers/MovieManager/MovieManager";
import { Store as StoreInterface } from "store/interfaces";
import { CircularProgress } from "@material-ui/core";
import { getMappedMovies } from "utils/getMappedMovies";
import dynamic from "next/dynamic";

const LatestSection = dynamic(() => import("components/LatestSection"), {
  loading: () => <CircularProgress color="secondary" />,
});

interface ComponentProps {
  upcomingMovies: Movie[];
}

const Home = React.memo(({ upcomingMovies }: ComponentProps): JSX.Element => {
  const movieManager = (Store.getState() as StoreInterface).movieStore?.manager;
  useEffect(() => {
    if (!movieManager) {
      Store.dispatch(setMovieManager(new MovieManager({ upcomingMovies })));
    }
  }, [upcomingMovies]);

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
});

export async function getServerSideProps() {
  const movieRequest = await getLatestMovies();
  const upcomingMovies = getMappedMovies(movieRequest);
  return {
    props: {
      upcomingMovies,
    },
  };
}

export default Home;
