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

const ArgumentList = ({ debate, isSpectator }) => {
    const { debateId } = useParams();
    const [args, setArgs] = useState(null);
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
        const args = await getCurrentRoundArguments({ debateId });
        setArgs(args);
        scrollToEnd();
    }, [debateId]);

    useEffect(() => {
        getArguments();
        socket.on('arguments update', () => {
            getArguments();
        });
        return () => {
            socket.off('arguments update');
        };
    }, [getArguments]);

    if (!args) {
        return (
            <Box display="flex" flex={1}>
                <Spinner />
            </Box>
        );
    }

    return (
        <Box flex={1} overflow="auto" ref={argumentListElRef} paddingX={'2%'}>
            {args.map(argument => (
                <ArgumentItem
                    key={argument._id}
                    isOwner={argument.user._id === user._id}
                    isFirstTeam={teamId === argument.team}
                    argument={argument}
                    debate={debate}
                    isSpectator={isSpectator}
                >
                    {argument.content}
                </ArgumentItem>
            ))}
        </Box>
    );
};

export { ArgumentList };
