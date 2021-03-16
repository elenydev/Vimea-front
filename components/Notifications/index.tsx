import React, { useState } from "react";
import Store from "@/../store/configureStore";
import { useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { getNotification } from "@/../components/Notifications/domain/selectors";
import { Notification } from "@/../infrastructure/interfaces/Notification/notification";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = (): JSX.Element => {
  const classes = useStyles();
  const notificationsStore = useSelector(getNotification);
  const { shouldOpen, message, variant } = notificationsStore;
  const [open, setOpen] = useState(shouldOpen || false);
  const handleClose = (event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
