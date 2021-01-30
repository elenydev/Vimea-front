import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Movie } from "../interfaces/MovieInterfaces/movie";
import { API_KEY, BASE_PHOTO_URL, BASE_URL } from "../constants";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;

  background: url("https://image.tmdb.org/t/p/original/wzJRB4MKi3yK138bJyuL9nx47y6.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: brightness(65%);
`;

const Home = React.memo(
  (): JSX.Element => {
    return (
      <>
        <Head>
          <title>Vimea</title>
        </Head>
        <Wrapper>
          <h1>Starter</h1>
        </Wrapper>
      </>
    );
  }
);

export default Home;
