import Head from "next/head";
import React, { useEffect } from "react";
import BackgroundWrapper from "@/../components/BackgroundWrapper";
import Navigation from "@/../components/Navigation/index";
import Hero from "@/../components/Hero/index";
import { getLatestMovies } from "../requests/movies/moviesRequests";
import { Movie } from "../infrastructure/interfaces/Movie/movie";
import Store from "@/../store/configureStore";
import { setMovieManager } from "../managers/MovieManager/actions";
import MovieManager from '@/../managers/MovieManager/MovieManager';
import { Store as StoreInterface } from "../store/interfaces";

interface ComponentProps {
  upcomingMovies: Movie[]
}

const Home = React.memo(
  ({ upcomingMovies }: ComponentProps): JSX.Element => {
    const movieManager = (Store.getState() as StoreInterface).movieStore?.movieManager;

    useEffect(() => {
      if (!movieManager) {
        Store.dispatch(setMovieManager(new MovieManager({ upcomingMovies })));
      }
    }, []);

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

export async function getServerSideProps() {
  const movieRequest = await getLatestMovies();
  const upcomingMovies = movieRequest ?? [];
  return {
    props: {
      upcomingMovies
    }
  }
}

export default Home;
