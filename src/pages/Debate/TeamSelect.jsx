import React, { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import { FormHeader } from '../../shared/components/Form/FormHeader';
import { joinTeam } from '../../services/Debate';
import { UserContext } from '../../providers/user';
import socket from '../../shared/socket';

const TeamSelect = ({ debate }) => {
    const { getUser } = useContext(UserContext);
    const teams = debate.teams;

    const handleClick = team => async () => {
        socket.emit('join debate team', debate._id);
        await joinTeam({ debateId: debate._id, teamId: team._id });
        await getUser();
    };

    return (
        <>
            <FormHeader>{'PASIRINK KOMANDĄ'}</FormHeader>
            <Box display="flex" width="100%" justifyContent="space-evenly">
                {teams.map((team, i) => (
                    <Button
                        variant="contained"
                        size="large"
                        key={team._id}
                        color={i % 2 === 0 ? 'secondary' : 'primary'}
                        onClick={handleClick(team)}
                    >
                        {team.name}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export { TeamSelect };
