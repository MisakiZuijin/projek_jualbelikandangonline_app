import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PopupMenu.css';

const PopupMenu = ({ role, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logika logout (misalnya, hapus token autentikasi)
        navigate('/');
        onClose();
    };

    const handleEditProfile = () => {
        if (role === 'admin') {
            navigate('/edit-profile-admin'); // Rute untuk admin
        } else {
            navigate('/edit-profile-user'); // Rute untuk user
        }
        onClose(); // Tutup popup setelah navigasi
    };

    const handleHistory = () => {
        if (role === 'admin') {
            navigate('/history-admin'); // Rute untuk admin
        } else {
            navigate('/history-user'); // Rute untuk user
        }
        onClose();
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