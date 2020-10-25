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

const DebatePage = () => {
    const classes = useStyles();

    const { initializeLayout } = useContext(LayoutDataContext);
    useEffect(() => initializeLayout(), [initializeLayout]);

    const { debateId } = useParams();
    const [debate, setDebate] = useState(null);
    const { user } = useContext(UserContext);

    const fetchDebate = useCallback(async () => {
        const debate = await getDebate({ id: debateId });
        console.log(debate);
        setDebate(debate);
    }, [debateId]);

    useEffect(() => {
        fetchDebate();
    }, [fetchDebate]);

    if (!debate) {
        return <Spinner />;
    } else if (!debate._id) {
        return <NotFound />;
    }

    const isUserInATeam = user.activeDebates.some(e => e._id === debate._id);
    const isModerator = debate.creator._id === user._id;
    if (!isUserInATeam && !isModerator) {
        return (
            <Container component="main" className={classes.container}>
                <TeamSelect debate={debate} />
            </Container>
        );
    }

    return (
        <Container component="main" disableGutters={true} maxWidth={false}>
            <></>
        </Container>
    );
};

export { DebatePage };
