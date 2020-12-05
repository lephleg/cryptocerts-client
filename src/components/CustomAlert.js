import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function CustomAlert(props) {
  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={props.alertOpen}
        autoHideDuration={5000}
        onClose={props.handleAlertClose}
        message={props.alertMessage}
      />
  );
}
