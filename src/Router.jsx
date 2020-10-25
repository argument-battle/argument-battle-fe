import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SearchPage } from './pages/Search';
import { CreatePage } from './pages/Create';
import { DebatePage } from './pages/Debate';
import { SignUpPage } from './pages/SignUp';
import { NotFoundPage } from './pages/NotFound';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/Home';
import { PrivateRoute, GuestOnlyRoute } from './shared/components/Routes';

const PAGE_PATHS = {
    HOME: '/',
    SEARCH: '/paieska',
    DEBATE: '/debatai',
    CREATE: '/sukurti',
    SIGN_UP: '/registracija',
    LOG_IN: '/prisijungimas'
};

const Router = () => {
    return (
        <Switch>
            <Route exact path={PAGE_PATHS.HOME} component={HomePage} />
            <GuestOnlyRoute
                exact
                path={PAGE_PATHS.SIGN_UP}
                component={SignUpPage}
            />
            <GuestOnlyRoute
                exact
                path={PAGE_PATHS.LOG_IN}
                component={LoginPage}
            />
            <PrivateRoute
                exact
                path={PAGE_PATHS.CREATE}
                component={CreatePage}
            />
            <Route exact path={PAGE_PATHS.SEARCH} component={SearchPage} />
            <Route
                exact
                path={`${PAGE_PATHS.DEBATE}/:debateId`}
                component={DebatePage}
            />
            <Route component={NotFoundPage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
