import React from 'react';
import { Divider, Drawer } from '@material-ui/core';
import useStyles from '../styles/NavBar';
import { NavList } from './NavList';
import { UserProfile } from './UserProfile';

const NavBar = () => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
        >
            <UserProfile />
            <Divider />
            <NavList />
        </Drawer>
    );
};

export { NavBar };
