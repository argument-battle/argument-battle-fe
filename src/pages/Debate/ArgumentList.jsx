import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext
} from 'react';
import { Box } from '@material-ui/core';
import { ArgumentItem } from './ArgumentItem';
import { Spinner } from '../../shared/components/Spinner';
import socket from '../../shared/socket';
import { UserContext } from '../../providers/user';
import { getCurrentRoundArguments } from '../../services/Debate';
import { useParams } from 'react-router-dom';

const ArgumentList = ({ debate }) => {
    const { debateId } = useParams();
    const [args, setArgs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const argumentListElRef = useRef(null);
    const { user } = useContext(UserContext);

    const teamId = debate.teams[0]._id;

    const scrollToEnd = () => {
        const el = argumentListElRef.current;
        if (!el) {
            return;
        }
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 1);
    };

    const getArguments = useCallback(async () => {
        if (!debateId) {
            return;
        }
        setIsLoading(true);
        const args = await getCurrentRoundArguments({ debateId });
        setArgs(args);
        setIsLoading(false);
        scrollToEnd();
    }, [debateId]);

    useEffect(() => {
        getArguments();
        socket.on('new argument', () => {
            getArguments();
        });
        return () => {
            socket.off('new argument');
        };
    }, [getArguments]);

    if (!args || isLoading) {
        return (
            <Box display="flex" flex={1}>
                <Spinner />
            </Box>
        );
    }

    return (
        <Box flex={1} overflow="auto" ref={argumentListElRef}>
            {args.map(({ content, user: argUser, team }, index) => (
                <ArgumentItem
                    key={index}
                    isOwner={argUser === user._id}
                    isFirstTeam={teamId === team}
                >
                    {content}
                </ArgumentItem>
            ))}
        </Box>
    );
};

export { ArgumentList };
