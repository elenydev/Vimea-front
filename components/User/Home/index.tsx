import React from "react";
import { BackgroundWrapper } from "@/../components/BackgroundWrapper/index";
import ChangePasswordForm from "@/../components/User/ChangePasswordForm/index";
import { Wrapper } from "./home.styles";

const index = () => {
  return (
    <BackgroundWrapper>
      <Wrapper>
        <ChangePasswordForm />
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default index;
