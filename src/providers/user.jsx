import React, { createContext, useState } from 'react';
import { getMe, getGuest, logoutUser as logout } from '../services/User';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function getUser() {
        const { user } = await getMe();
        if (user) {
            setUser({ ...user, isGuest: false });
        } else {
            const guest = await _getGuest();
            setUser({ ...guest, isGuest: true });
        }
    }

    async function _getGuest() {
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
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, getUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
