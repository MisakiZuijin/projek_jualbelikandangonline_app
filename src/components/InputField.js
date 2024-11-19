// src/components/InputField.js
import React from 'react';
import './CSS/InputField.css';

const InputField = ({ type, id, placeholder, value, onChange, label }) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                className="form-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default InputField;