const postUser = async ({ username, password }) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

export { postUser };
