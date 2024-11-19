import React, { createContext, useState } from 'react';

export const ProfileUserContext = createContext();

export const ProfileUserProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        profilePic: "/Rafael-Theo-Santoso-Photo.jpg", // Default image
        username: "UserName",
        email: "User@example.com",
        address: "User Address",
        phone: "081234567890",
    });

    const updateProfile = (updatedProfile) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...updatedProfile,
        }));
    };

    return (
        <ProfileUserContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileUserContext.Provider>
    );
};
