import { Movie } from '@/../infrastructure/interfaces/Movie/movie'
import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { Wrapper, Heading, SubHeading, RatingWrapper } from './latestCurrentMovie.styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import { Text } from '@/../dictionary/text';

interface ComponentProps {
    currentMovie: Movie
}

const index = (props: ComponentProps): JSX.Element => {
    const { vote_average, vote_count, overview, original_title } = props.currentMovie;
    const movieRate = +(vote_average / 2).toFixed();
    return (
        <Wrapper>
            <Heading>{original_title}</Heading>
            <SubHeading>{overview}</SubHeading>
            <RatingWrapper>
                <Rating
                    readOnly
                    value={movieRate}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />({vote_count})
            </RatingWrapper>
            <label>
                <Button
                    color="secondary"
                    variant="contained"
                >
                    {Text.app.main.components.latest.add__favourite}
                </Button>
            </label>

        </Wrapper>
    )
}

export default index
