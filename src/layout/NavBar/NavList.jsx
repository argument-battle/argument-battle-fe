import React from 'react';
import { List, ListItemIcon, ListItemText, Divider, ListItem } from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../Router';
import { ActiveBattles } from './ActiveBattles';

const mockedBattles = [
    { id: 1, isSpectating: true },
    { id: 2, isSpectating: false }
];

const NavList = () => (
    <List>
        <ActiveBattles battles={mockedBattles} />
        <Divider />
        <ListItem button key="Search rooms" component={Link} to={PAGE_PATHS.SEARCH}>
            <ListItemIcon>
                <Search />
            </ListItemIcon>
            <ListItemText primary="Search rooms" />
        </ListItem>
        <ListItem button key="Create a room" component={Link} to={PAGE_PATHS.CREATE}>
            <ListItemIcon>
                <Add />
            </ListItemIcon>
            <ListItemText primary="Create a room" />
        </ListItem>
    </List>
);

export { NavList };