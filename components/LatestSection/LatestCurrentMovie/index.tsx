import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import React, { SyntheticEvent } from "react";
import Rating from "@material-ui/lab/Rating";
import {
  Wrapper,
  Heading,
  SubHeading,
  RatingWrapper,
} from "./latestCurrentMovie.styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import { getCookie } from "@/../services/cookieService";
import { useSelector } from "react-redux";
import { CURRENT_USER_EMAIL, USER_COOKIE } from "@/../constants";
import { getUserManager } from "../../App/domain/selectors";
import { getMappedFavouriteMovie } from "@/../utils/getMappedFavouriteMovie";
import { Tooltip } from "@material-ui/core";
import { Text } from "@/../dictionary/text";

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

  const isAddingDisabled =
    !getCookie(USER_COOKIE) && !getCookie(CURRENT_USER_EMAIL);
  const userManager = useSelector(getUserManager);

  const addToFavourites = (e: SyntheticEvent): void => {
    e.stopPropagation();
    const mappedFavouriteMovie = getMappedFavouriteMovie(props.currentMovie);
    userManager.addFavourite(mappedFavouriteMovie);
  };
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
        title={Text.app.main.common.havent__logged__in}
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
            {Text.app.main.components.latest.add__favourite}
          </Button>
        </label>
      </Tooltip>
    </Wrapper>
  );
};

export default index;
