const postBattle = async ({ title }) => {
    const response = await fetch('/api/battles', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
};

export { postBattle };
