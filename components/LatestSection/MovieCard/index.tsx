import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import React, { SyntheticEvent } from "react";
import {
  Wrapper,
  ContentWrapper,
} from "@/../components/LatestSection/MovieCard/moviecard.styles";
import Button from "@material-ui/core/Button";
import { Text } from "@/../dictionary/text";
import { getCookie } from "@/../services/cookieService";
import { USER_COOKIE, CURRENT_USER_EMAIL } from "@/../constants";
import { useSelector } from "react-redux";
import { getUserManager } from "../../App/domain/selectors";
import { getMappedFavouriteMovie } from "@/../utils/getMappedFavouriteMovie";

interface ComponentProps {
  movie: Movie;
  setRandomMovie: (movieId: number) => void;
}

const index = React.memo(
  (props: ComponentProps): JSX.Element => {
    const { movie, setRandomMovie } = props;
    const setCurrentRandomMovie = (): void => {
      setRandomMovie(movie.id as number);
    };
    const isAddingDisabled = !getCookie(USER_COOKIE) && !getCookie(CURRENT_USER_EMAIL);
    const userManager = useSelector(getUserManager);

    const addToFavourites = (e: SyntheticEvent): void => {
      e.stopPropagation();
      const mappedFavouriteMovie = getMappedFavouriteMovie(movie);
      userManager.addFavourite(mappedFavouriteMovie);
    };

    return (
      <Wrapper
        onClick={setCurrentRandomMovie}
        backgroundImage={movie.backdrop_path}
      >
        <ContentWrapper>
          <h3>{movie.title}</h3>
          <label>
            <Button
              color="secondary"
              variant="contained"
              disabled={isAddingDisabled}
              onClick={addToFavourites}
            >
              {Text.app.main.components.latest.add__favourite}
            </Button>
          </label>
        </ContentWrapper>
      </Wrapper>
    );
  }
);

export default index;
