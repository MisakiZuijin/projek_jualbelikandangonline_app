import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Logika autentikasi sederhana dengan pengecekan role berdasarkan email
        const isAdmin = email === 'admin@gmail.com' && password === 'adminpass';
        const isUser = email === 'user@gmail.com' && password === 'userpass';

        if (isAdmin) {
            // Navigasi ke halaman Admin Dashboard
            navigate('/admin');
        } else if (isUser) {
            // Navigasi ke halaman Beranda Pengguna
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
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>        
                <p className="register-text">
                    Don't have an account? ... <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;