import React from 'react';
import { Divider, Drawer } from '@material-ui/core';
import useStyles from './styles/NavBar';
import { NavList } from './NavList';

const NavBar = () => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
        >
            <Divider />
            <NavList />
        </Drawer>
    );
};

export { NavBar };
