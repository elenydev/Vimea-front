import React from "react";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;

  background: url("images/backgroundImage.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: brightness(65%);
`;

const index = ({ children }): JSX.Element => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default index;
