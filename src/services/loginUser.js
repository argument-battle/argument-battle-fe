const loginUser = async ({ username, password }) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

export { loginUser };
