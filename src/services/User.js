const postUser = async ({ username, email, password, secretCode }) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, secretCode }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getGuest = async () => {
    const response = await fetch('/api/users/guest');
    return await response.json();
};

const getMe = async () => {
    const response = await fetch('/api/users/me');
    return await response.json();
};

const logoutUser = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const loginUser = async ({ email, password }) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

export { postUser, getGuest, getMe, logoutUser, loginUser };
