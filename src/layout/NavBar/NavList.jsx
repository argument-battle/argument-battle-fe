import React, { useContext } from 'react';
import {
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItem
} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../Router';
import { ActiveBattles } from './ActiveBattles';
import { UserContext } from '../../providers/user';

const NavList = () => {
    const { user } = useContext(UserContext);
    return (
        <List>
            {!user.isGuest && (
                <>
                    <ActiveBattles />
                    <Divider />
                </>
            )}
            <ListItem
                button
                key="Search rooms"
                component={Link}
                to={PAGE_PATHS.SEARCH}
            >
                <ListItemIcon>
                    <Search />
                </ListItemIcon>
                <ListItemText primary="Ieškoti debatų" />
            </ListItem>
            {user.isModerator && (
                <ListItem
                    button
                    key="Create a room"
                    component={Link}
                    to={PAGE_PATHS.CREATE}
                >
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Sukurti debatų kambarį" />
                </ListItem>
            )}
        </List>
    );
};

export { NavList };
