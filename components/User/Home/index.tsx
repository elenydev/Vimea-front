import React, { FC } from "react";
import { BackgroundWrapper } from "components/BackgroundWrapper/index";
import ChangePasswordForm from "components/User/ChangePasswordForm/index";
import { AvatarWrapper, Wrapper } from "./home.styles";
import UserAvatar from "components/User/Avatar";

const index: FC = () => {
  return (
    <BackgroundWrapper>
      <Wrapper>
        <AvatarWrapper>
          <UserAvatar />
        </AvatarWrapper>
        <ChangePasswordForm />
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default index;
