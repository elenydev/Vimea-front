import { Movie } from '@/../infrastructure/interfaces/Movie/movie'
import React from 'react'

interface ComponentProps {
  movie: Movie,
  setRandomMovie: (movieId: number) => void;
}

const index = React.memo((props: ComponentProps): JSX.Element => {
  console.log(props)
  return (
    <div>

    </div>
  )
});

export default index
