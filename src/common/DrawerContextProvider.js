import React from 'react';

const DRAWER_WIDTH = 240;

export const DrawerContext = React.createContext({
    width: DRAWER_WIDTH,
    open: false,
    setOpen: () => { },
    setClosed: () => { }
});

export default function DrawerContextProvider({ children }) {

    const [drawerOpen, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawerContext = {
        width: DRAWER_WIDTH,
        open: drawerOpen,
        setOpen: handleDrawerOpen,
        setClosed: handleDrawerClose
    }

    return (
        <DrawerContext.Provider value={drawerContext}>
            {children}
        </DrawerContext.Provider>
    );
}