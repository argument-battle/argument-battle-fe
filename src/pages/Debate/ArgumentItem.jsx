import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    CardHeader
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/ArgumentItem';
import { postUpvote } from '../../services/Argument';
import socket from '../../shared/socket';
import { useParams } from 'react-router-dom';

const ArgumentItem = ({
    argument,
    children,
    isOwner,
    isFirstTeam,
    debate,
    isSpectator
}) => {
    const isDebateNotActive = debate.status !== 'active';
    const { rating, user, createdAt } = argument;
    const styles = useStyles();
    const { palette } = useTheme();
    const { debateId } = useParams();

    const handleClick = async () => {
        await postUpvote({ argumentId: argument._id });
        socket.emit('update argument', debateId);
    };

    return (
        <Box
            maxWidth="60%"
            marginY="5%"
            bgcolor={
                isFirstTeam ? palette.teamGreen.main : palette.teamRed.main
            }
            marginLeft={isOwner ? 'auto' : 'unset'}
        >
            <Card className={styles.card}>
                <CardHeader
                    className={styles.header}
                    action={
                        !isDebateNotActive &&
                        isSpectator && (
                            <IconButton onClick={handleClick}>🖤</IconButton>
                        )
                    }
                    title={user.username}
                    subheader={
                        <>
                            <Box component="span">🖤{rating}</Box>
                            <Box component="span" marginLeft="3%">
                                {new Date(createdAt).toLocaleString()}
                            </Box>
                        </>
                    }
                />
                <CardContent className={styles.content}>
                    <Typography variant="h5" component="p">
                        {children}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export { ArgumentItem };
