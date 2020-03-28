import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { SpeakerNotes, Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../Router';
import useStyles from './styles/ActiveBattle';
import { USER_TYPES } from '../../shared/constants';

const ActiveBattle = ({ battle }) => {
    const classes = useStyles();

    const { _id, userType, title } = battle;
    const isSpectating = userType === USER_TYPES.SPECTATOR;

    return (
        <ListItem
            button
            className={classes.nested}
            component={Link}
            to={PAGE_PATHS.BATTLE + '/' + _id}
        >
            <ListItemIcon>{isSpectating ? <Visibility /> : <SpeakerNotes />}</ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    );
};

export { ActiveBattle };
