// src/components/ProfilePicture.js
import React from 'react';

const ProfilePicture = ({ profile, onChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-pic-container">
            <img
                src={profile?.profilePic || '/default-profile-pic.jpg'} // Fallback to default if profilePic is undefined
                alt="Profile"
                className="profile-pic"
            />
            <input
                type="file"
                id="profilePicInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                type="button"
                onClick={() => document.getElementById('profilePicInput').click()}
                className="change-pic-btn"
            >
                Change Profile Picture
            </button>
        </div>
    );
};


export default ProfilePicture;
