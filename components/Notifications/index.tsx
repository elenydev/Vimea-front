import React, { useState, useEffect, useCallback } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Notification } from "infrastructure/interfaces/Notification/notification";
import { useSelector } from "react-redux";
import { getNotificationManager } from "components/Notifications/domain/selectors";

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
  const { shouldOpen, message, variant } = props.notification;
  const classes = useStyles();
  const [open, setOpen] = useState(shouldOpen || false);
  const notificationsManager = useSelector(getNotificationManager);

  const handleClose = useCallback((event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }, []);


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

export default React.memo(CustomizedSnackbars);
