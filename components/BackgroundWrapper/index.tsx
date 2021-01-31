import React from "react";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;

  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%),
    url("/images/bg.jpg") no-repeat center;
  background-size: cover;
`;

const index = ({ children }): JSX.Element => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default index;
