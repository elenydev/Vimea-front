import React from "react";
import { BackgroundWrapper } from "@/../components/BackgroundWrapper/index";
import { useSelector } from "react-redux";
import { getUserMovies } from "@/../components/App/domain/selectors";
import { MoviesWrapper } from "./favourites.styles";
import MovieCard from "@/../components/LatestSection/MovieCard/";

const index = () => {
  const userMovies = useSelector(getUserMovies);

  return (
    <BackgroundWrapper>
      <MoviesWrapper>
        {userMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </MoviesWrapper>
    </BackgroundWrapper>
  );
};

export default index;
