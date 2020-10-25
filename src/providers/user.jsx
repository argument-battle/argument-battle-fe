import React, { createContext, useState } from 'react';
import {
    getMe,
    getGuest,
    logoutUser as logout,
    loginUser as login,
    postUser as create
} from '../services/User';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function getUser() {
        const user = await getMe();
        if (!user.error) {
            setUser({ ...user, isGuest: false });
        } else {
            const guest = await getGuestUser();
            setUser({ ...guest, isGuest: true });
        }
    }

    async function getGuestUser() {
        let guest = localStorage.getItem('guest');
        if (guest) {
            return JSON.parse(guest);
        } else {
            guest = await getGuest();
            localStorage.setItem('guest', JSON.stringify(guest));
            return guest;
        }
    }

    async function logoutUser() {
        await logout();
        setUser(await getUser());
    }

    async function loginUser({ email, password }) {
        const response = await login({ email, password });
        if (!response.error) {
            setUser(await getUser());
        }
        return response;
    }

    async function postUser({ username, password, email, secretCode }) {
        const response = await create({
            username,
            password,
            email,
            secretCode
        });
        if (response.user) {
            await loginUser({ email, password });
        }
        return response;
    }

    return (
        <UserContext.Provider
            value={{ user, getUser, logoutUser, loginUser, postUser }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
