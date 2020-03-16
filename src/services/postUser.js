const postUser = async ({ username, password }) => {
    const response = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
};

export { postUser };
