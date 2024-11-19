// src/components/PopupMenu.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PopupMenu.css';

const PopupMenu = () => {
    const [setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logika logout (misalnya, hapus token autentikasi)
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile-user');
        setShowPopup(false); // Tutup popup setelah navigasi
    };

    const handleHistory = () => {
        navigate('/history-user');
        setShowPopup(false);
    };

    return (
        <div className="popup-menu">
            <button onClick={handleEditProfile} className="popup-item">Edit Profile</button>
            <button onClick={handleHistory} className="popup-item">History</button>
            <button onClick={handleLogout} className="popup-item logout-button">Logout</button>
        </div>
    );
};

export default PopupMenu;
