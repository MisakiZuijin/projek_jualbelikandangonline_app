// ProfileContext.js
import React, { createContext, useState } from 'react';

export const ProfileUserContext = createContext();

export const ProfileUserProvider = ({ children }) => {
    const [profilePic, setProfilePic] = useState("/Rafael-Theo-Santoso-Photo.jpg");

    return (
        <ProfileUserContext.Provider value={{ profilePic, setProfilePic }}>
            {children}
        </ProfileUserContext.Provider>
    );
};
