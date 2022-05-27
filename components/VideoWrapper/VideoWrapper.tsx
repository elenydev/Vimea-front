import React, { SyntheticEvent } from "react";
import { VideoWrapper } from "components/VideoWrapper/videowrapper.styles";
import {
  getMovieManager,
  getMovieTrailerUrl,
} from "managers/MovieManager/selectors";
import { useSelector } from "react-redux";

const index = () => {
  const movieManager = useSelector(getMovieManager);
  const movieTrailerUrl = useSelector(getMovieTrailerUrl);

  const toggleTrailerVisiblity = (e: SyntheticEvent) => {
    e.stopPropagation();
    movieManager.toggleTrailerVisibility();
  };

  return (
    <VideoWrapper onClick={toggleTrailerVisiblity}>
      <iframe frameBorder="0" src={movieTrailerUrl}></iframe>
    </VideoWrapper>
  );
};

export default index;
