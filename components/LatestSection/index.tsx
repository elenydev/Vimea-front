import React, { useEffect, useState, useCallback } from "react";
import {
  BackgroundWrapper,
  Wrapper,
  Container,
  MoviesWrapper,
} from "./latestsection.styles";
import { Movie } from "infrastructure/interfaces/Movie/movie";
import LatestCurrentMovie from "components/LatestSection/LatestCurrentMovie/";
import MovieCard from "components/LatestSection/MovieCard/";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Pagination
} from 'swiper/core';
import VideoWrapper from "components/VideoWrapper";
import { getIsTrailerVisible } from "managers/MovieManager/selectors";
import { useSelector } from 'react-redux'; 

SwiperCore.use([Pagination]);

interface ComponentProps {
  upcomingMovies: Movie[];
}

const breakpoints = {
  300: {
    slidesPerView: 1
  },
  768: {
    slidesPerView: 2
  },
  992: {
    slidesPerView: 3
  },
  1280: {
    slidesPerView: 4
  },
  1600: {
    slidesPerView: 5
  }
};

const index = React.memo((props: ComponentProps): JSX.Element => {
  const { upcomingMovies } = props;
  const [currentRandomUpcomingMovie, setCurrentRandomUpcomingMovie] =
    useState<Movie>(undefined);
  const [randomMovieId, setRandomMovieId] = useState<number>(undefined);
  const randomIndex = Math.floor(Math.random() * 19);

  const isMovieTrailerVisible = useSelector(getIsTrailerVisible)

  const filteredUpcomingMovies = upcomingMovies.filter(
    ({ id }) => id !== currentRandomUpcomingMovie?.id || ""
  );
  const randomUpcomingMovies = [
    ...new Set(filteredUpcomingMovies),
  ];

  const setRandomMovie = useCallback(
    (movieId: number | string): void => {
      const newRandomMovie = upcomingMovies.find(({ id }) => +id === movieId);
      setCurrentRandomUpcomingMovie(newRandomMovie);
      setRandomMovieId(+movieId);
    },
    [randomMovieId]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const randomMovie = upcomingMovies[randomIndex];
      setCurrentRandomUpcomingMovie(randomMovie);
      setRandomMovieId(+randomMovie.id);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Wrapper id="latest">
      {isMovieTrailerVisible && <VideoWrapper />}
      <BackgroundWrapper
        backgroundImage={currentRandomUpcomingMovie?.backdrop_path}
      >
        <Container>
          {currentRandomUpcomingMovie && (
            <LatestCurrentMovie currentMovie={currentRandomUpcomingMovie} />
          )}
          <MoviesWrapper>
            <Swiper spaceBetween={25} breakpoints={breakpoints} pagination={true} className="mySwiper">
              {randomUpcomingMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard
                    movie={movie}
                    setRandomMovie={setRandomMovie}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </MoviesWrapper>
        </Container>
      </BackgroundWrapper>
    </Wrapper>
  );
});

export default index;
