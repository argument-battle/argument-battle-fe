import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SearchPage } from './pages/Search';
import { CreatePage } from './pages/Create';
import { BattlePage } from './pages/Battle';
import { SignUpPage } from './pages/SignUp';
import { NotFoundPage } from './pages/NotFound';
import { LoginPage } from './pages/Login';

const PAGE_PATHS = {
    SEARCH: '/search',
    BATTLE: '/battle',
    CREATE: '/create',
    SIGN_UP: '/signup',
    LOG_IN: '/login'
};

const Router = () => {
    return (
        <Switch>
            <Route exact path={PAGE_PATHS.SIGN_UP} component={SignUpPage} />
            <Route exact path={PAGE_PATHS.SEARCH} component={SearchPage} />
            <Route exact path={`${PAGE_PATHS.BATTLE}/:battleId`} component={BattlePage} />
            <Route exact path={PAGE_PATHS.CREATE} component={CreatePage} />
            <Route exact path={PAGE_PATHS.LOG_IN} component={LoginPage} />
            <Route component={NotFoundPage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
