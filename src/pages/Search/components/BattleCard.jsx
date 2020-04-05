import React, { useContext } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@material-ui/core';
import { VisibilityTwoTone, SportsMmaTwoTone } from '@material-ui/icons';
import useStyles from './styles/BattleCard';
import { UserContext } from '../../../providers/user';
import { PAGE_PATHS } from '../../../Router';

const BattleCard = ({ battle, routerHistory }) => {
    const classes = useStyles();

    const { user } = useContext(UserContext);
    const { isGuest, _id: userId } = user;

    const { topic, status, _id, defender } = battle;
    const isDefender = userId === defender;
    const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

    const attack = () => {
        routerHistory.push(`${PAGE_PATHS.BATTLE}/${_id}`);
    };

    const spectate = () => {
        routerHistory.push(`${PAGE_PATHS.BATTLE}/${_id}`);
    };

    return (
        <Box margin={1}>
            <Card className={classes.card} onClick={spectate}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        {status === 'lobby' ? (
                            <SportsMmaTwoTone fontSize="large" />
                        ) : (
                            <VisibilityTwoTone fontSize="large" />
                        )}
                        <Box marginX={1} flexGrow={1} width="100%">
                            <Typography>{capitalizedTopic}</Typography>
                        </Box>
                        {status === 'lobby' && !isGuest && !isDefender && (
                            <Button size="large" onClick={attack}>
                                Attack
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export { BattleCard };
