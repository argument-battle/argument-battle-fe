import React from 'react';
import { Redirect } from 'react-router-dom';
import { PAGE_PATHS } from '../../Router';
const HomePage = () => <Redirect to={PAGE_PATHS.SEARCH} />;

export { HomePage };
