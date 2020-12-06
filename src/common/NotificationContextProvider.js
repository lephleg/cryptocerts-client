import React from 'react';

export const NotificationContext = React.createContext({
    message: '',
    open: false,
    showMessage: () => { },
    hideMessage: () => { }
});

export default function NotificationContextProvider({ children }) {

    const [notificationOpen, setNotificationOpen] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');

    const handleNotificationOpen = (message) => {
        setNotificationMessage(message);
        setNotificationOpen(true);
    }

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotificationOpen(false);
        setNotificationMessage('');
    };

    const notificationContext = {
        message: notificationMessage,
        open: notificationOpen,
        showMessage: handleNotificationOpen,
        hideMessage: handleNotificationClose
    }

    return (
        <NotificationContext.Provider value={notificationContext}>
            {children}
        </NotificationContext.Provider>
    );
}