import React, { useEffect, useState, useCallback } from 'react'
import { BackgroundWrapper, Wrapper, Container } from './latestsection.styles';
import { Movie } from '@/../infrastructure/interfaces/Movie/movie';
import LatestCurrentMovie from '@/../components/LatestSection/LatestCurrentMovie/';

interface ComponentProps {
    upcomingMovies: Movie[]
}

const index = (props: ComponentProps): JSX.Element => {
    const { upcomingMovies } = props;
    const [currentRandomUpcomingMovie, setCurrentRandomUpcomingMovie] = useState<Movie>(undefined);
    const [randomMovieId, setRandomMovieId] = useState<number>(undefined);
    const randomIndex = Math.floor(Math.random() * 19);

    const setRandomMovie = useCallback((movieId: number): void => {
        const newRandomMovie = upcomingMovies.find(({ id }) => id === movieId);
        setCurrentRandomUpcomingMovie(newRandomMovie);
        setRandomMovieId(movieId);
    }, [randomMovieId]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const randomMovie = upcomingMovies[randomIndex]
            setCurrentRandomUpcomingMovie(randomMovie);
            setRandomMovieId(randomMovie.id);
        }
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <Wrapper id="latest">
            <BackgroundWrapper backgroundImage={currentRandomUpcomingMovie?.backdrop_path}>
                <Container>
                    {currentRandomUpcomingMovie && <LatestCurrentMovie currentMovie={currentRandomUpcomingMovie} />}
                </Container>
            </BackgroundWrapper>
        </Wrapper>
    )
}

export default index
