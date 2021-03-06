import React from 'react';
import { ListItemText, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../../Router';
import useStyles from '../styles/ActiveDebate';

const NavDebate = ({ debate }) => {
    const classes = useStyles();

    const { _id, topic } = debate;

    return (
        <ListItem
            button
            className={classes.nested}
            component={Link}
            to={PAGE_PATHS.DEBATE + '/' + _id}
        >
            <ListItemText primary={topic} />
        </ListItem>
    );
};

export { NavDebate };
