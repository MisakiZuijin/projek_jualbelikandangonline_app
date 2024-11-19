// src/components/ProfileForm.js
import React from 'react';

const ProfileForm = ({ username, setUsername, email, setEmail, address, setAddress, phone, setPhone, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="edit-profile-form">
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="save-btn">Save Changes</button>
        </form>
    );
};

export default ProfileForm;
