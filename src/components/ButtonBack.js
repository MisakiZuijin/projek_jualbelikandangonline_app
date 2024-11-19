// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/ButtonBack.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya
    };

    return (
        <button className="back-button" onClick={handleBack}>
            <span className="back-icon">&#8592;</span>
        </button>
    );
};

export default BackButton;