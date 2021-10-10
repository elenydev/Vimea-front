import React, {
  SyntheticEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Wrapper,
  ContentWrapper,
} from "components/LatestSection/MovieCard/moviecard.styles";
import Button from "@material-ui/core/Button";
import { Text } from "dictionary/text";
import { YOUTUBE_MOVIE_URL, VIMEO_MOVIE_URL } from "constants/index";
import { useSelector } from "react-redux";
import { getUserManager, getUser } from "components/User/domain/selectors";
import { getMappedFavouriteMovie } from "utils/getMappedFavouriteMovie";
import { Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import { getCurrentMovieTrailer } from "repositories/movies/movies";
import { UserFavouriteMovie } from "infrastructure/interfaces/User/user";
import { getMovieManager } from "managers/MovieManager/selectors";

interface ComponentProps {
  movie: UserFavouriteMovie;
  setRandomMovie?: (movieId: string) => void;
}

const index = (props: ComponentProps): JSX.Element => {
  const { movie, setRandomMovie } = props;
  const currentUser = useSelector(getUser);
  const userManager = useSelector(getUserManager);
  const movieManager = useSelector(getMovieManager);
  const userMovies = currentUser?.favouriteMovies;
  const isInFavourites = !!userMovies?.find(({ id }) => id === movie.id);
  const [isMovieFavourite, setIsMovieFavourite] = useState(isInFavourites);
  const [movieTrailerUrl, setMovieTrailerUrl] = useState("");

  const isAddingDisabled = useMemo(
    () => !currentUser?.accessToken,
    [currentUser?.accessToken]
  );

  const setCurrentRandomMovie = useCallback((): void => {
    setRandomMovie ? setRandomMovie(movie.id) : null;
  }, [movie.id, setRandomMovie]);

  const addToFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    const mappedFavouriteMovie = getMappedFavouriteMovie(movie);
    userManager?.addFavourite(mappedFavouriteMovie);
  }, [movie, userManager]);

  const removeFromFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    userManager?.removeFavourite(movie.id);
  }, [movie.id, userManager]);

  const handleButtonClick = useCallback(
    (e: SyntheticEvent) => {
      isMovieFavourite ? removeFromFavourites(e) : addToFavourites(e);
    },
    [isMovieFavourite]
  );

  const toggleTrailerVisibility = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      movieManager.setTrailerUrl(movieTrailerUrl);
      movieManager.toggleTrailerVisibility();
    },
    [movieTrailerUrl]
  );

  useEffect(() => {
    userMovies?.find(({ id }) => movie.id === id)
      ? setIsMovieFavourite(true)
      : setIsMovieFavourite(false);
  }, [userMovies, movie.id]);

  useEffect(() => {
    (async () => {
      const currentMovieTrailer = await getCurrentMovieTrailer(movie.id);
      if (currentMovieTrailer?.site === "YouTube") {
        setMovieTrailerUrl(`${YOUTUBE_MOVIE_URL}${currentMovieTrailer.key}`);
      } else {
        setMovieTrailerUrl(`${VIMEO_MOVIE_URL}${currentMovieTrailer?.key}`);
      }
    })();
  }, []);

  return (
    <>
      <Wrapper
        onClick={setCurrentRandomMovie}
        backgroundImage={movie.backdrop_path}
      >
        <ContentWrapper>
          <label className="view__trailer">
            <IconButton onClick={toggleTrailerVisibility}>
              <PlayCircleFilledIcon />
            </IconButton>
          </label>

          <h3>{movie.title}</h3>
          <Tooltip
            title={
              isInFavourites
                ? Text.app.main.common.already_added
                : Text.app.main.common.havent_logged_in
            }
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
                {isMovieFavourite
                  ? Text.app.main.components.latest.remove_favourite
                  : Text.app.main.components.latest.add_favourite}
              </Button>
            </label>
          </Tooltip>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default React.memo(index);
