import React, { createContext, useState } from 'react';

export const ProfileAdminContext = createContext();

export const ProfileAdminProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        profilePic: "/Rafael-Theo-Santoso-Photo.jpg", // Default image
        username: "AdminName",
        email: "admin@example.com",
        address: "Admin Address",
        phone: "081234567890",
    });

    const updateProfile = (updatedProfile) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...updatedProfile,
        }));
    };

    return (
        <ProfileAdminContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileAdminContext.Provider>
    );
};
