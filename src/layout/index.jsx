import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { NavBar } from './NavBar';
import { UserContext } from '../providers/user';
import { Spinner } from '../shared/components/Spinner';

const LayoutDataContext = createContext(null);

const initialPageSettings = { shouldHideNavBar: false };

const Layout = ({ children }) => {
    const [pageSettings, setPageSettings] = useState(initialPageSettings);
    const initializeLayout = useCallback(
        (newSettings = {}) => {
            setPageSettings({
                ...initialPageSettings,
                ...newSettings
            });
        },
        [setPageSettings]
    );

    const { user, getUser } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);

    return (
        <LayoutDataContext.Provider value={{ pageSettings, initializeLayout }}>
            <SnackbarProvider maxSnack={3}>
                {user ? (
                    <>
                        {!pageSettings.shouldHideNavBar && <NavBar />}
                        {children}
                    </>
                ) : (
                    <Spinner />
                )}
            </SnackbarProvider>
        </LayoutDataContext.Provider>
    );
};

export { Layout, LayoutDataContext };
