import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField.js';
import ButtonLogin from '../../components/ButtonLogin.js';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Logika autentikasi sederhana dengan pengecekan role berdasarkan email
        if (email === 'admin@gmail.com' && password === 'adminpass') {
            navigate('/admin');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Navigasi ke halaman beranda pengguna
            navigate('/home');
        } else {
            alert('Login gagal, periksa email dan password Anda');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <InputField
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                    />
                    <InputField
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                    />
                    <ButtonLogin text="Login" />
                </form>
                <p className="register-text">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;