import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { SpeakerNotes, AccessTime, Bookmark } from '@material-ui/icons';
import useStyles from './styles/DebateCard';
import { PAGE_PATHS } from '../../../Router';

const iconStatusMap = {
    inactive: AccessTime,
    active: SpeakerNotes,
    ended: Bookmark
};

const DebateCard = ({ debate, routerHistory }) => {
    const classes = useStyles();

    const { topic, status, _id } = debate;
    const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

    const navigateToDebate = async () => {
        routerHistory.push(`${PAGE_PATHS.DEBATE}/${_id}`);
    };
    const Icon = iconStatusMap[status];

    return (
        <Box margin={1}>
            <Card className={classes.card} onClick={navigateToDebate}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Icon fontSize="large" />
                        <Box marginX={1} flexGrow={1} width="100%">
                            <Typography>{capitalizedTopic}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export { DebateCard };
