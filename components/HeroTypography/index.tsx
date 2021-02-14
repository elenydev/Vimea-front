import React from "react";
import { Text } from "@/../dictionary/text";

import { Header, MainHeading, SubHeading } from "./herotypography.styles";

const index = (): JSX.Element => {
  return (
    <>
      <Header>
        <MainHeading>{Text.app.main.components.hero.main__heading}</MainHeading>
        <SubHeading>{Text.app.main.components.hero.sub__heading}</SubHeading>
      </Header>
    </>
  );
};

export default index;
