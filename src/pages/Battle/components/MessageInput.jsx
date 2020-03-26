import React, { useState } from 'react';
import { TextField, Box } from '@material-ui/core';
import { postMessage } from '../../../services/Message';

function MessageInput({ battleId }) {
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    async function onSubmit() {
        if (content) {
            setIsSending(true);
            await postMessage({ content, battle: battleId });
            setIsSending(false);
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
                disabled={isSending}
            />
        </Box>
    );
}

export { MessageInput };
