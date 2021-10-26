import React from "react";
import Link from "next/link";

import { UpcomingAnhor, Wrapper } from "./hero.styles";
import HeroTypography from "components/HeroTypography/HeroTypography.server";
import { Text } from "dictionary/text";

const index = (): JSX.Element => {
  return (
    <Wrapper id="about">
      <HeroTypography />
      <UpcomingAnhor>
        <Link href='#latest'>{Text.app.main.components.hero.upcoming}</Link>
      </UpcomingAnhor>
    </Wrapper>
  );
};

export default index;
