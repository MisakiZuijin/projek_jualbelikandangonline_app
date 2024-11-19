// src/components/RemoveButton.js
import React from 'react';
import './CSS/ButtonRemove.css';

const RemoveButton = ({ onClick }) => {
    return (
        <button className="remove-button" onClick={onClick}>
            Remove
        </button>
    );
};

export default RemoveButton;
