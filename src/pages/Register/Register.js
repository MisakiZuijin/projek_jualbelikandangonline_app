import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Simulate saving user data to localStorage
        const newUser = { ...formData };
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        setSuccess('Registration successful!');

        // Navigate to the login page after successful registration
        setTimeout(() => {
            navigate('/'); // Navigating to the login page
        }, 1000); // Wait for 1 second before navigating to allow success message to show

        // Reset form fields
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button type="submit" className="btn-register">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
