import React from 'react';
import { MUITheme } from './MUITheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Layout } from './layout';

//providers
import { UserProvider } from './providers/user';

const App = () => (
    <ThemeProvider theme={MUITheme}>
        <CssBaseline />
        <UserProvider>
            <BrowserRouter>
                <Layout>
                    <Router />
                </Layout>
            </BrowserRouter>
        </UserProvider>
    </ThemeProvider>
);

export { App };
