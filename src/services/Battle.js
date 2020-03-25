const postBattle = async ({ title }) => {
    const response = await fetch('/api/battles', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getBattle = async ({ id }) => {
    const response = await fetch(`/api/battles/${id}`);
    return await response.json();
};

export { postBattle, getBattle };
