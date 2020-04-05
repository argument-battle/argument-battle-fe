import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { Message } from './Message';
import { getMessages } from '../../../services/Message';
import { Spinner } from '../../../shared/components/Spinner';
import { DIRECTION } from '../constants';
import { USER_TYPES } from '../../../shared/constants';
import socket from '../../../shared/socket';

function MessageList({ battle, userType }) {
    const [messages, setMessages] = useState(null);
    const messageListEl = useRef(null);

    useEffect(() => {
        _getMessages();
        newMessageListener();
        return clearListeners;
    }, [battle]);

    function newMessageListener() {
        socket.on('new message', () => {
            _getMessages();
        });
    }

    function clearListeners() {
        socket.off('new message');
    }

    async function _getMessages() {
        const { messages } = await getMessages({ battle: battle._id });
        await setMessages(messages);
        scrollToEnd();
    }

    function scrollToEnd() {
        const el = messageListEl.current;
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 1);
    }

    function getMessageColor(user) {
        return user === battle.defender._id ? '#83CDC0' : '#DFA5A5';
    }

    function getMessagePosition(user) {
        const isAttackerView = userType === USER_TYPES.ATTACKER;
        const isDefenderMessage = user === battle.defender._id;

        if ((isAttackerView && !isDefenderMessage) || (!isAttackerView && isDefenderMessage)) {
            return DIRECTION.LEFT;
        } else {
            return DIRECTION.RIGHT;
        }
    }

    if (!messages) {
        return (
            <Box display="flex" height="100%">
                <Spinner />
            </Box>
        );
    }

    return (
        <Box flex={2} flexDirection="column" overflow="auto" marginX="40px" ref={messageListEl}>
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
}

export { MessageList };
