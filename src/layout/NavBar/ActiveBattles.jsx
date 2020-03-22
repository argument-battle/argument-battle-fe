import React from 'react';
import { Collapse, List, ListItemText, ListItem } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ActiveBattle } from './ActiveBattle';

const ActiveBattles = ({ battles = [] }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <>
            <ListItem button key="My active battles" onClick={() => setIsOpen(!isOpen)}>
                <ListItemText primary="My active battles" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {battles.map(({ id, isSpectating }) => (
                        <ActiveBattle key={id} id={id} isSpectating={isSpectating} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export { ActiveBattles };
