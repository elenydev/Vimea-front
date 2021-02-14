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
      rgba(0, 0, 0, 0.9) 0,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url("/images/bg.jpg") no-repeat center, rgba(0,  0,  0,  0.3);
  background-size: cover;
`;

const index = ({ children }): JSX.Element => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default index;
