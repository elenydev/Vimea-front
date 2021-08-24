import React, { useEffect } from "react";
import { BackgroundWrapper } from "components/BackgroundWrapper/index";
import { useSelector } from "react-redux";
import { getUserManager, getUserMovies } from "components/User/domain/selectors";
import { MoviesWrapper } from "./favourites.styles";
import MovieCard from "components/LatestSection/MovieCard/";
import { getCookie } from "services/cookieService";
import { CURRENT_USER_EMAIL_COOKIE } from "utils/constants";
import { getIsTrailerVisible } from "managers/MovieManager/selectors";
import VideoWrapper from "components/VideoWrapper";

const index = () => {
  const userMovies = useSelector(getUserMovies)
  const userManager = useSelector(getUserManager);
  const isMovieTrailerVisible = useSelector(getIsTrailerVisible);

  useEffect(() => {
    const userEmail = getCookie(CURRENT_USER_EMAIL_COOKIE);
    userManager?.getCurrentUserFavourites(userEmail);
  }, []);

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
