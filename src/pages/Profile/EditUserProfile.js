import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext.js';
import './EditProfile.css';

const EditUserProfile = () => {
    const { profilePic, setProfilePic } = useContext(ProfileUserContext);
    const [username, setUsername] = useState("Your Username");
    const [email, setEmail] = useState("your-email@example.com");
    const [address, setAddress] = useState("Your Address");
    const [phone, setPhone] = useState("081234567890");

    const navigate = useNavigate();

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika untuk menyimpan perubahan profil
        console.log("Profile Updated:", { username, email, address, phone });
        navigate('/home'); // Kembali ke halaman beranda setelah menyimpan perubahan
    };

    const handleBack = () => {
        navigate(-2); // Go back to the previous page
    };

    return (
        <div className="edit-profile-background">
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="profile-pic-container">
                        <img src={profilePic} alt="Profile" className="profile-pic" />
                        <input
                            type="file"
                            id="profilePicInput"
                            onChange={handleProfilePicChange}
                            style={{ display: 'none' }}
                        />
                        <button type="button" onClick={() => document.getElementById('profilePicInput').click()} className="change-pic-btn">
                            Change Profile Picture
                        </button>
                    </div>

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

                    {/* Input fields lainnya */}
                    <button type="submit" className="save-btn">Save Changes</button>
                </form>
            </div>
            <button className="back-button" onClick={handleBack}>
                <span className="back-icon">&#8592;</span>
            </button>
        </div>
    );
};

export default EditUserProfile;