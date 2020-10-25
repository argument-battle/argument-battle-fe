import React, { useState } from 'react';
import {
    Collapse,
    List,
    ListItemText,
    ListItem,
    ListItemIcon
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { NavDebate } from './NavDebate';

const DebateList = ({ name, debates = [], icon }) => {
    const [isOpen, setIsOpen] = useState(!debates.length);

    return (
        <>
            <ListItem button key={name} onClick={() => setIsOpen(!isOpen)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {debates.map(debate => (
                        <NavDebate key={debate._id} debate={debate} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export { DebateList };
