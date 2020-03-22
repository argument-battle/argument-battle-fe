const postUser = async ({ username, email, password }) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getGuestUser = async () => {
    const response = await fetch('/api/users/guest', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

const getMeUser = async () => {
    const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', credentials: 'include' }
    });
    return await response.json();
};

const logOutUser = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', credentials: 'include' }
    });
    return await response.json();
};

const loginUser = async ({ username, password }) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
};

export { postUser, getGuestUser, getMeUser, logOutUser, loginUser };
