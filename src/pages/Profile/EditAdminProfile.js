import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileAdminContext } from '../../context/ProfileAdminContext.js';
import ProfilePicture from '../../components/ProfilePicture.js';
import ProfileForm from '../../components/ProfileForm.js';
import BackButton from '../../components/ButtonBack.js';
import './EditProfile.css';

const EditAdminProfile = () => {
    const { profile, updateProfile } = useContext(ProfileAdminContext);
    const navigate = useNavigate();
    
    // Handle case where `profile` is undefined
    if (!profile) {
        return <div>Loading profile...</div>;
    }

 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile Updated:", profile);
        navigate('/admin');
    };

    return (
        <div className="edit-profile-background">
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <ProfilePicture
                    profile={profile}
                    onChange={(newPic) => updateProfile({ profilePic: newPic })}
                />
                <ProfileForm
                    username={profile.username}
                    setUsername={(value) => updateProfile({ username: value })}
                    email={profile.email}
                    setEmail={(value) => updateProfile({ email: value })}
                    address={profile.address}
                    setAddress={(value) => updateProfile({ address: value })}
                    phone={profile.phone}
                    setPhone={(value) => updateProfile({ phone: value })}
                    rekening={profile.rekening}
                    setRekening={(value) => updateProfile({ rekening: value })}
                    onSubmit={handleSubmit}
                />
            </div>
            <BackButton />
        </div>
    );
};

export default EditAdminProfile;