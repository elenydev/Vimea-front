import { Movie } from '@/../infrastructure/interfaces/Movie/movie'
import React from 'react'
import { Wrapper, ContentWrapper } from '@/../components/LatestSection/MovieCard/moviecard.styles';
import Button from '@material-ui/core/Button';
import { Text } from '@/../dictionary/text';


interface ComponentProps {
  movie: Movie,
  setRandomMovie: (movieId: number) => void;
}

const index = React.memo((props: ComponentProps): JSX.Element => {
  const { movie, setRandomMovie } = props;
  const setCurrentRandomMovie = (): void => {
    setRandomMovie(movie.id);
  }

  const addToFavourites = (e:Event): void => {
    e.stopPropagation();
    console.log('addToFavourites');
  }

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
            onClick={addToFavourites}
          >
            {Text.app.main.components.latest.add__favourite}
          </Button>
        </label>
      </ContentWrapper>

    </Wrapper >
  )
});

export default index
