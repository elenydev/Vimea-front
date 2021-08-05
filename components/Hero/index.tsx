import React from "react";
import Link from "next/link";

import { UpcomingAnhor, Wrapper } from "./hero.styles";
import HeroTypography from "components/HeroTypography/index";
import { Text } from "dictionary/text";

const index = (): JSX.Element => {
  return (
    <Wrapper>
      <HeroTypography />
      <UpcomingAnhor>
        <Link href='#latest'>{Text.app.main.components.hero.upcoming}</Link>
      </UpcomingAnhor>
    </Wrapper>
  );
};

export default index;
