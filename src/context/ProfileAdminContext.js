// ProfileContext.js
import React, { createContext, useState } from 'react';

export const ProfileAdminContext = createContext();

export const ProfileAdminProvider = ({ children }) => {
    const [profilePic, setProfilePic] = useState("/Rafael-Theo-Santoso-Photo.jpg");

    return (
        <ProfileAdminContext.Provider value={{ profilePic, setProfilePic }}>
            {children}
        </ProfileAdminContext.Provider>
    );
};