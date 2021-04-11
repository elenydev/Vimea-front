import React, { useState, useEffect } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Notification } from "@/../infrastructure/interfaces/Notification/notification";
import NotificationsManager from "./NotificationsManager";
import { useSelector } from "react-redux";
import { getNotificationManager } from "./domain/selectors";

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

const CustomizedSnackbars = (props: { notification: Notification }): JSX.Element => {
  const classes = useStyles();
  const { shouldOpen, message, variant } = props.notification;
  const notificationsManager = useSelector(getNotificationManager);

  const [open, setOpen] = useState(shouldOpen || false);
  const handleClose = (event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  useEffect(() => {
    if(shouldOpen) {
      setTimeout(() => {
        notificationsManager.clearNotification()
      },2000)
    }
  }, [shouldOpen])

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
