import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { NotificationsContext } from '../context/NotificationsProvider';

export default function Notification() {
  const notificationContext = useContext(NotificationsContext);

  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={notificationContext.open}
        autoHideDuration={5000}
        onClose={notificationContext.hideMessage}
        message={notificationContext.message}
      />
  );
}
