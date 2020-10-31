import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useTimer } from 'react-timer-hook';
import { useParams } from 'react-router-dom';
import socket from '../../shared/socket';
import { useEffect } from 'react';

const DebateHeader = ({ debate, isModerator }) => {
    const { topic, rounds, status, winnerTeam } = debate;
    const { debateId } = useParams();
    const roundNum = rounds.reduce((prev, curr) => {
        return curr.status === 'ended' ? ++prev : prev;
    }, 0);
    const round = rounds.find(e => e.status === 'active');
    const { seconds, minutes, restart, start } = useTimer({
        expiryTimestamp: new Date().getTime()
    });

    useEffect(() => {
        if (round?.startedAt) {
            restart(new Date(round.startedAt).getTime() + 60_000);
            start();
        }
    }, [round, restart, start]);

    return (
        <>
            {isModerator && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    bgcolor="lavender"
                    padding="20px"
                    boxShadow={1}
                >
                    <Typography variant="h6" component="span">
                        Moderatoriaus veiksmai:
                    </Typography>
                    <Button
                        variant="outlined"
                        disabled={status !== 'inactive'}
                        onClick={() => {
                            socket.emit('start debate', debateId);
                        }}
                    >
                        Pradėti debatus
                    </Button>
                </Box>
            )}
            <Box
                padding="20px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                boxShadow={3}
            >
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography variant="h6" component="span">
                        Tema
                    </Typography>
                    <Typography variant="h6" component="span">
                        Etapai
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography variant="h4" component="span">
                        {topic}
                    </Typography>
                    <Typography variant="h4" component="span">
                        {roundNum}/{rounds.length}
                    </Typography>
                </Box>
                {status === 'active' && (
                    <Typography variant="h5" component="span">
                        Iki etapo pabaigos likę {minutes}:{seconds}
                    </Typography>
                )}
                {winnerTeam && (
                    <Typography variant="h4" component="span">
                        🎉{winnerTeam.name} komanda laimėjo!
                    </Typography>
                )}
                {debate.status === 'inactive' && (
                    <Typography variant="h4" component="span">
                        Debatai dar neprasidėjo
                    </Typography>
                )}
            </Box>
        </>
    );
};

export { DebateHeader };
