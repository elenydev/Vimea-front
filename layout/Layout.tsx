import React from "react";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

import { theme } from "theme/theme";
import GlobalStyle from "theme/globalStyles";
import Notifications from "components/Notifications/Notifications.server";
import { getNotification } from "components/Notifications/domain/selectors";

const Layout = ({ children }): JSX.Element => {
  const notification = useSelector(getNotification);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
        {notification.shouldOpen && (
          <Notifications notification={notification} />
        )}
      </ThemeProvider>
    </>
  );
};

export default Layout;
