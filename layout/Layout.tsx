import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "../theme/theme";
import GlobalStyle from "../theme/globalStyles";

const Layout = ({ children }): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
