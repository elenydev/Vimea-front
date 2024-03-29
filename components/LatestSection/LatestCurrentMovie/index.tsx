import { Movie } from "infrastructure/interfaces/Movie/movie";
import React, { SyntheticEvent, useCallback, useMemo } from "react";
import Rating from "@material-ui/lab/Rating";
import {
  Wrapper,
  Heading,
  SubHeading,
  RatingWrapper,
} from "./latestCurrentMovie.styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { getUser, getUserManager } from "components/User/domain/selectors";
import { getMappedFavouriteMovie } from "utils/getMappedFavouriteMovie";
import { Tooltip } from "@material-ui/core";
import { Text } from "dictionary/text";

interface ComponentProps {
  currentMovie: Movie;
}

const index = (props: ComponentProps): JSX.Element => {
  const {
    vote_average,
    vote_count,
    overview,
    original_title,
  } = props.currentMovie;
  const movieRate = +(vote_average / 2).toFixed();
  const currentUser = useSelector(getUser);
  const userManager = useSelector(getUserManager);

  const isAddingDisabled = useMemo(() => !currentUser?.accessToken, [currentUser?.accessToken]);

  const addToFavourites = useCallback((e: SyntheticEvent): void => {
    e.stopPropagation();
    const mappedFavouriteMovie = getMappedFavouriteMovie(props.currentMovie);
    userManager.addFavourite(mappedFavouriteMovie);
  }, [userManager, props.currentMovie]);

  return (
    <Wrapper>
      <Heading>{original_title}</Heading>
      <SubHeading>{overview}</SubHeading>
      <RatingWrapper>
        <Rating
          readOnly
          value={movieRate}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
        ({vote_count})
      </RatingWrapper>
      <Tooltip
        title={Text.app.main.common.havent_logged_in}
        disableHoverListener={!isAddingDisabled}
        placement="bottom-end"
      >
        <label>
          <Button
            color="secondary"
            variant="contained"
            disabled={isAddingDisabled}
            onClick={addToFavourites}
          >
            {Text.app.main.components.latest.add_favourite}
          </Button>
        </label>
      </Tooltip>
    </Wrapper>
  );
};

export default index;
