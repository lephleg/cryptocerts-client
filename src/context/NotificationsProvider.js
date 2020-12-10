import React from 'react';

export const NotificationsContext = React.createContext({
    message: '',
    open: false,
    showMessage: () => { },
    hideMessage: () => { }
});

export default function NotificationsProvider({ children }) {

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
        <NotificationsContext.Provider value={notificationContext}>
            {children}
        </NotificationsContext.Provider>
    );
}