import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { SpeakerNotes, Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../Router';
import useStyles from './styles/ActiveBattle';

const ActiveBattle = ({ id, isSpectating }) => {
    const classes = useStyles();
    return (
        <ListItem
            button
            className={classes.nested}
            component={Link}
            to={PAGE_PATHS.BATTLE + '/' + id}
        >
            <ListItemIcon>{isSpectating ? <Visibility /> : <SpeakerNotes />}</ListItemIcon>
            <ListItemText primary="Starred" />
        </ListItem>
    );
};

export { ActiveBattle };
