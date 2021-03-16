import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "../theme/theme";
import GlobalStyle from "../theme/globalStyles";
import Notifications from "@/../components/Notifications/index";

const Layout = ({ children }): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
        <Notifications />
      </ThemeProvider>
    </>
  );
};

export default Layout;
