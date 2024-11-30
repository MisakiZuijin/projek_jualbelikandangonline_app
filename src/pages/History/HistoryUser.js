// src/components/History/History.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import PopupMenu from '../../components/PopupMenu.js';
import BackButton from '../../components/ButtonBack.js';
import './History.css';

const History = () => {
    const { profile } = useContext(ProfileUserContext);
    const [showPopup, setShowPopup] = useState(false);
    
    const role = 'user';

    // Sample data of purchase history
    const purchaseHistory = [
        {
            id: 1,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            quantity: 2,
            price: 200000,
            total: 400000,
            buyer: "Nur Rahman Saleh",
            address: "123 Main St, City",
            date: "2024-11-05",
            paymentMethod: "COD",
        },
        {
            id: 2,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            quantity: 1,
            price: 200000,
            total: 200000,
            buyer: "Nur Rahman Saleh",
            address: "123 Main St, City",
            date: "2024-11-04",
            paymentMethod: "Transfer",
        },
        {
            id: 3,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            quantity: 1,
            price: 200000,
            total: 200000,
            buyer: "Nur Rahman Saleh",
            address: "123 Main St, City",
            date: "2024-11-04",
            paymentMethod: "Transfer",
        }
        // Add more purchases as needed
    ];

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="history-container">
            <header className="history-header">
                <h1 className="store-name">CAGE SHOP</h1>
                <div className="user-info" onClick={togglePopup}>
                    <span className="user-name">{profile.username}</span>
                    <img className="profile-pic-history-user" src={profile.profilePic} alt="Profile" onClick={togglePopup}/>
                </div>

                {showPopup && <PopupMenu role={role} onClose={togglePopup} />}
            </header>

            <main className="history-content">
                <h2>Purchase History</h2>
                <div className="history-list">
                    {purchaseHistory.map(item => (
                        <div key={item.id} className="history-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <div className="item-name-container">
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: Rp {item.price.toLocaleString('Id-ID')}</p>
                                    <p>Total: Rp {item.total.toLocaleString('Id-ID')}</p>
                                </div>
                                <div className="buyer-container">
                                    <p>Buyer: {item.buyer}</p>
                                    <p>Address: {item.address}</p>
                                    <p>Date: {item.date}</p>
                                    <p>Payment Method: {item.paymentMethod}</p>
                                </div>
                                
                                <Link 
                                    to={`/receipt-User/${item.id}`} 
                                    className="receipt-button">
                                    Lihat Bukti
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <BackButton />

            <footer className="footer-history">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default History;