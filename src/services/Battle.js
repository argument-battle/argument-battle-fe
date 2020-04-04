const postBattle = async ({ topic }) => {
    const response = await fetch('/api/battles', {
        method: 'POST',
        body: JSON.stringify({ topic }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getBattle = async ({ id }) => {
    const response = await fetch(`/api/battles/${id}`);
    return await response.json();
};

const getAllBattles = async (params = {}) => {
    var query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    const response = await fetch(`/api/battles${query ? `?${query}` : ''}`);
    return await response.json();
};

export { postBattle, getBattle, getAllBattles };
