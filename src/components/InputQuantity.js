// src/components/InputQuantity.js
import React from 'react';

const InputQuantity = ({ value, onChange }) => {
    return (
        <input
            type="number"
            min="1"
            value={value}
            onChange={onChange}
        />
    );
};

export default InputQuantity;
