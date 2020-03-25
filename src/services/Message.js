const postMessage = async ({ content, battle }) => {
    const response = await fetch(`/api/messages?battle=${battle}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

export { postMessage };
