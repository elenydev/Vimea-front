import React from 'react'
import { BackgroundWrapper, Wrapper, Container } from './latestsection.styles';
import { Movie } from '@/../infrastructure/interfaces/Movie/movie';
import LatestCurrentMovie from '@/../components/LatestSection/LatestCurrentMovie/';

interface ComponentProps {
    upcomingMovies: Movie[]
}

const index = (props: ComponentProps): JSX.Element => {
    const { upcomingMovies } = props;
    const randomIndex = Math.floor(Math.random() * 19);
    const currentRandomUpcomingMovie = upcomingMovies[randomIndex];

    return (
        <Wrapper id="latest">
            <BackgroundWrapper backgroundImage={currentRandomUpcomingMovie?.backdrop_path}>
                <Container>
                    <LatestCurrentMovie currentMovie={currentRandomUpcomingMovie} />
                </Container>
            </BackgroundWrapper>
        </Wrapper>
    )
}

export default index
