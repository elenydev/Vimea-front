import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import React, { SyntheticEvent, useState, useEffect, useCallback } from "react";
import {
  Wrapper,
  ContentWrapper,
  VideoWrapper,
} from "@/../components/LatestSection/MovieCard/moviecard.styles";
import Button from "@material-ui/core/Button";
import { Text } from "@/../dictionary/text";
import { getCookie } from "@/../services/cookieService";
import {
  USER_COOKIE,
  CURRENT_USER_EMAIL_COOKIE,
  YOUTUBE_MOVIE_URL,
  VIMEO_MOVIE_URL,
} from "@/../constants";
import { useSelector } from "react-redux";
import { getUserManager, getUser } from "../../App/domain/selectors";
import { getMappedFavouriteMovie } from "@/../utils/getMappedFavouriteMovie";
import { Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import { getCurrentMovieTrailer } from "@/../requests/movies/moviesRequests";

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
  const isInFavourites = !!userMovies?.find(({ id }) => id === movie.id);
  const [isMovieFavourite, setIsMovieFavourite] = useState(isInFavourites);
  const [movieTrailerUrl, setMovieTrailerUrl] = useState("");
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);

  const isAddingDisabled =
    !getCookie(USER_COOKIE) && !getCookie(CURRENT_USER_EMAIL_COOKIE) && !currentUser;

  const addToFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    const mappedFavouriteMovie = getMappedFavouriteMovie(movie);
    userManager.addFavourite(mappedFavouriteMovie);
  }, []);

  const removeFromFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    userManager.removeFavourite(movie.id);
  }, []);

  const handleButtonClick = useCallback(
    (e: SyntheticEvent) => {
      isMovieFavourite ? removeFromFavourites(e) : addToFavourites(e);
    },
    [isMovieFavourite]
  );

  const toggleTrailerVisibility = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      setIsTrailerVisible((visible) => !visible);
    },
    [movieTrailerUrl]
  );

  useEffect(() => {
    userMovies?.find(({ id }) => movie.id === id)
      ? setIsMovieFavourite(true)
      : setIsMovieFavourite(false);
  }, [userMovies]);

  useEffect(() => {
    (async () => {
      const currentMovieTrailer = await getCurrentMovieTrailer(movie.id);
      if (currentMovieTrailer.site === "YouTube") {
        setMovieTrailerUrl(`${YOUTUBE_MOVIE_URL}${currentMovieTrailer.key}`);
      } else {
        setMovieTrailerUrl(`${VIMEO_MOVIE_URL}${currentMovieTrailer.key}`);
      }
    })();
  }, []);

  return (
    <>
      {isTrailerVisible && (
        <VideoWrapper onClick={toggleTrailerVisibility}>
          <iframe frameBorder="0" src={movieTrailerUrl}></iframe>
        </VideoWrapper>
      )}
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
});

export default index;
