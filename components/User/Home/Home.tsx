import React, { FC } from "react";
import { BackgroundWrapper } from "components/BackgroundWrapper/BackgroundWrapper.server";
import ChangePasswordForm from "components/User/ChangePasswordForm/ChangePasswordForm";
import { AvatarWrapper, Wrapper } from "./home.styles";
import UserAvatar from "components/User/Avatar/Avatar";

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
