import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { Message } from './Message';
import { getMessages as getMessagesService } from '../../../services/Message';
import { Spinner } from '../../../shared/components/Spinner';
import { DIRECTION } from '../constants';
import { USER_TYPES } from '../../../shared/constants';
import socket from '../../../shared/socket';

const MessageList = ({ battle, userType }) => {
    const [messages, setMessages] = useState(null);
    const messageListElRef = useRef(null);

    const scrollToEnd = () => {
        const el = messageListElRef.current;
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 1);
    };

    const getMessages = useCallback(async () => {
        const { messages } = await getMessagesService({ battle: battle._id });
        setMessages(messages);
        scrollToEnd();
    }, [battle]);

    useEffect(() => {
        getMessages();
        socket.on('new message', () => {
            getMessages();
        });
        return () => {
            socket.off('new message');
        };
    }, [battle, getMessages]);

    const getMessageColor = user => {
        return user === battle.defender._id ? '#83CDC0' : '#DFA5A5';
    };

    const getMessagePosition = user => {
        const isAttackerView = userType === USER_TYPES.ATTACKER;
        const isDefenderMessage = user === battle.defender._id;

        if ((isAttackerView && !isDefenderMessage) || (!isAttackerView && isDefenderMessage)) {
            return DIRECTION.LEFT;
        } else {
            return DIRECTION.RIGHT;
        }
    };

    if (!messages) {
        return (
            <Box display="flex" height="100%">
                <Spinner />
            </Box>
        );
    }

    return (
        <Box flex={2} flexDirection="column" overflow="auto" marginX="40px" ref={messageListElRef}>
            {messages.map(({ content, user }, index) => (
                <Message
                    key={index}
                    bgcolor={getMessageColor(user)}
                    position={getMessagePosition(user)}
                >
                    {content}
                </Message>
            ))}
        </Box>
    );
};

export { MessageList };
