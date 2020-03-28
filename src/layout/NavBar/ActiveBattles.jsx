import React, { useState, useContext } from 'react';
import { Collapse, List, ListItemText, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ActiveBattle } from './ActiveBattle';
import { UserContext } from '../../providers/user';

const ActiveBattles = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { user } = useContext(UserContext);
    const { battles } = user;

    return (
        <>
            <ListItem button key="My active battles" onClick={() => setIsOpen(!isOpen)}>
                <ListItemText primary="My active battles" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {battles.map(battle => (
                        <ActiveBattle key={battle._id} battle={battle} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export { ActiveBattles };
