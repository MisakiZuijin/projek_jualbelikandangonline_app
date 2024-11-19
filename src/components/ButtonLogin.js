// src/components/ButtonLogin.js
import React from 'react';
import './CSS/ButtonLogin.css';

const ButtonLogin = ({ onClick, text }) => {
    return (
        <button type="submit" className="btn-login" onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonLogin;