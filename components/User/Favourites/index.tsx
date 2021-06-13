import React, { useEffect, useState } from "react";
import { BackgroundWrapper } from "@/../components/BackgroundWrapper/index";
import { useSelector } from "react-redux";
import { getUserManager, getUserMovies } from "@/../components/App/domain/selectors";
import { MoviesWrapper } from "./favourites.styles";
import MovieCard from "@/../components/LatestSection/MovieCard/";
import { UserFavouriteMovie } from "@/../infrastructure/interfaces/User/user";
import { getCookie } from "@/../services/cookieService";
import { CURRENT_USER_EMAIL } from "@/../constants";

const index = () => {
  const userMovies = useSelector(getUserMovies)
  const [currentMovies, setCurrentMovies] = useState<UserFavouriteMovie[]>(userMovies);
  const userManager = useSelector(getUserManager);

  useEffect(() => {
    const userEmail = getCookie(CURRENT_USER_EMAIL);
    userManager?.getCurrentUserFavourites(userEmail);
    setCurrentMovies(userMovies);
  }, [userMovies]);

  useEffect(() => {
    const userEmail = getCookie(CURRENT_USER_EMAIL);
    userManager?.getCurrentUserFavourites(userEmail);
    setCurrentMovies(userMovies);
  }, []);

  return (
    <BackgroundWrapper>
      <MoviesWrapper>
        {currentMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </MoviesWrapper>
    </BackgroundWrapper>
  );
};

export default index;
