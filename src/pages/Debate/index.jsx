import React, { useEffect, useContext, useCallback, useState } from 'react';
import { LayoutDataContext } from '../../layout';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../providers/user';
import { getDebate } from '../../services/Debate';
import { Spinner } from '../../shared/components/Spinner';
import NotFound from '../../shared/components/NotFound';
import { TeamSelect } from './TeamSelect';
import useStyles from './styles/DebatePage';
import { ArgumentInput } from './ArgumentInput';
import { ArgumentList } from './ArgumentList';
import socket from '../../shared/socket';

const DebatePage = () => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), [initializeLayout]);

    const { debateId } = useParams();
    const [debate, setDebate] = useState(null);
    const { user } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);

    const fetchDebate = useCallback(async () => {
        setIsLoading(true);
        const debate = await getDebate({ id: debateId });
        setIsLoading(false);
        setDebate(debate);
    }, [debateId]);

    useEffect(() => {
        fetchDebate();
        socket.emit('join debate', debateId);
        socket.on('debate update', () => {
            fetchDebate();
        });
        return () => {
            socket.emit('leave debate', debateId);
            socket.off('battle update');
        };
    }, [debateId, fetchDebate]);

    if (!debate || isLoading) {
        return <Spinner />;
    } else if (!debate._id) {
        return <NotFound />;
    }

    const isUserInATeam = user.activeDebates?.some(e => e._id === debate._id);
    const isModerator = debate.creator._id === user._id;
    if (!user.isGuest && !isUserInATeam && !isModerator) {
        return (
            <Container component="main" className={classes.container}>
                <TeamSelect debate={debate} />
            </Container>
        );
    }

    const isSpectator =
        isModerator ||
        user.isGuest ||
        !debate.participatingClubs.some(e => e._id === user.debateClub._id);

    const hasDebateEnded = debate.status === 'ended';

    return (
        <Container component="main" className={classes.container}>
            <ArgumentList debate={debate} isSpectator={isSpectator} />
            {!isSpectator && !hasDebateEnded && !user.isGuest && (
                <ArgumentInput
                    debateId={debate._id}
                    debateStatus={debate.status}
                />
            )}
        </Container>
    );
};

export { DebatePage };
