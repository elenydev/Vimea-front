import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import React, { SyntheticEvent, useState, useEffect, useCallback } from "react";
import {
  Wrapper,
  ContentWrapper,
} from "@/../components/LatestSection/MovieCard/moviecard.styles";
import Button from "@material-ui/core/Button";
import { Text } from "@/../dictionary/text";
import { getCookie } from "@/../services/cookieService";
import { USER_COOKIE, CURRENT_USER_EMAIL } from "@/../constants";
import { useSelector } from "react-redux";
import {
  getUserManager,
  getUser,
  getUserMovies,
} from "../../App/domain/selectors";
import { getMappedFavouriteMovie } from "@/../utils/getMappedFavouriteMovie";
import { Tooltip } from "@material-ui/core";

interface ComponentProps {
  movie: Movie;
  setRandomMovie?: (movieId: string) => void;
}

const index = React.memo((props: ComponentProps): JSX.Element => {
  const { movie, setRandomMovie } = props;
  const setCurrentRandomMovie = (): void => {
    setRandomMovie ? setRandomMovie(movie.id) : null;
  };
  const currentUser = useSelector(getUser);
  const userManager = useSelector(getUserManager);
  const userMovies = currentUser?.favouriteMovies;
  const isInFavourites = !!(userMovies?.find(({ id }) => id === movie.id));
  const [isMovieFavourite, setIsMovieFavourite] = useState(isInFavourites);

  const isAddingDisabled =
    !getCookie(USER_COOKIE) &&
    !getCookie(CURRENT_USER_EMAIL) &&
    !currentUser;

  const addToFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    const mappedFavouriteMovie = getMappedFavouriteMovie(movie);
    userManager.addFavourite(mappedFavouriteMovie);
  }, []);

  const removeFromFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    userManager.removeFavourite(movie.id);
  }, []);

  const handleButtonClick = useCallback((e: SyntheticEvent) => {
    isMovieFavourite ? removeFromFavourites(e) : addToFavourites(e);
  }, [isMovieFavourite]);

  useEffect(() => {
    userMovies?.find(({ id }) => movie.id === id)
      ? setIsMovieFavourite(true)
      : setIsMovieFavourite(false);
  }, [userMovies]);

  return (
    <Wrapper
      onClick={setCurrentRandomMovie}
      backgroundImage={movie.backdrop_path}
    >
      <ContentWrapper>
        <h3>{movie.title}</h3>
        <Tooltip
          title={isInFavourites ? Text.app.main.common.already_added : Text.app.main.common.havent_logged_in}
          disableHoverListener={!isAddingDisabled}
          placement="bottom-end"
        >
          <label>
            <Button
              color="secondary"
              variant="contained"
              disabled={isAddingDisabled}
              onClick={handleButtonClick}
            >
              {isMovieFavourite ? Text.app.main.components.latest.remove_favourite : Text.app.main.components.latest.add_favourite}
            </Button>
          </label>
        </Tooltip>
      </ContentWrapper>
    </Wrapper>
  );
});

export default index;
