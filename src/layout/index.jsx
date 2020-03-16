import React, { createContext, useState, useCallback } from 'react';
import { NavBar } from './NavBar';

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
    return (
        <LayoutDataContext.Provider value={{ pageSettings, initializeLayout }}>
            {!pageSettings.shouldHideNavBar && <NavBar />}
            {children}
        </LayoutDataContext.Provider>
    );
};

export { Layout, LayoutDataContext };
