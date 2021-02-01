import React from "react";
import styled from "styled-components";

import BackgroundWrapper from "@/../components/BackgroundWrapper";
import Navigation from "@/../components/Navigation";
import SignInForm from "@/../components/SignInForm";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const index = () => {
  return (
    <BackgroundWrapper>
      <Wrapper>
        <Navigation />
        <SignInForm />
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default index;
