import React, { createContext, useState } from 'react';
import { getMe, getGuest, logoutUser as logout, loginUser as login } from '../services/User';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function getUser() {
        const { user } = await getMe();
        if (user) {
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

    async function loginUser(username, password) {
        const response = await login(username, password);
        if (!response.error) {
            setUser(await getUser());
        }
        return response;
    }

    return (
        <UserContext.Provider value={{ user, getUser, logoutUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
