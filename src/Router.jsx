import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SearchPage } from './pages/Search';
import { CreatePage } from './pages/Create';
import { BattlePage } from './pages/Battle';

const PAGE_PATHS = {
    SEARCH: '/search',
    BATTLE: '/battle',
    CREATE: '/create'
};

const Router = () => {
    return (
        <Switch>
            <Route exact path={PAGE_PATHS.SEARCH} component={SearchPage} />
            <Route exact path={`${PAGE_PATHS.BATTLE}/:battleId`} component={BattlePage} />
            <Route exact path={PAGE_PATHS.CREATE} component={CreatePage} />
        </Switch>
    );
};

export { Router, PAGE_PATHS };
