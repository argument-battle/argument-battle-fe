import React, { useState } from 'react';
import { TextField, Box } from '@material-ui/core';
import { postArgument } from '../../services/Debate';
import socket from '../../shared/socket';

const placeholderMap = {
    active: '',
    inactive: 'Debatai tuoj prasidės...'
};

function ArgumentInput({ debateId, debateStatus }) {
    const isDebateNotActive = debateStatus !== 'active';

    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    async function onSubmit() {
        if (content) {
            setIsSending(true);
            await postArgument({ content, debateId });
            setIsSending(false);
            socket.emit('send argument', debateId);
            setContent('');
        }
    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            onSubmit();
        }
    }

    return (
        <Box bgcolor="white" margin="20px 40px" borderRadius="4px">
            <TextField
                variant="outlined"
                fullWidth={true}
                onKeyDown={onKeyDown}
                onChange={e => setContent(e.target.value)}
                value={content}
                disabled={isSending || isDebateNotActive}
                placeholder={placeholderMap[debateStatus]}
            />
        </Box>
    );
}

export { ArgumentInput };
