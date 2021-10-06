import React, { useEffect } from "react";
import { BackgroundWrapper } from "components/BackgroundWrapper/index";
import { useSelector } from "react-redux";
import { getUserManager, getUserMovies } from "components/User/domain/selectors";
import { MoviesWrapper } from "./favourites.styles";
import MovieCard from "components/LatestSection/MovieCard/";
import { getIsTrailerVisible } from "managers/MovieManager/selectors";
import VideoWrapper from "components/VideoWrapper";

const index = () => {
  const userMovies = useSelector(getUserMovies)
  const userManager = useSelector(getUserManager);
  const isMovieTrailerVisible = useSelector(getIsTrailerVisible);

  useEffect(() => {
    userManager?.getCurrentUserFavourites();
  }, [userManager]);

  return (
    <BackgroundWrapper>
      {isMovieTrailerVisible && <VideoWrapper />}
      <MoviesWrapper>
        {userMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </MoviesWrapper>
    </BackgroundWrapper>
  );
};

export default index;
