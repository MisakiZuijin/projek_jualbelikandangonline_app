// src/components/History/History.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import { PurchaseHistoryContext } from '../../context/PurchaseHistoryContext';
import PopupMenu from '../../components/PopupMenu.js';
import BackButton from '../../components/ButtonBack.js';
import './History.css';

const History = () => {
    const navigate = useNavigate();
    const { profile } = useContext(ProfileUserContext);
    const { history } = useContext(PurchaseHistoryContext);
    const [showPopup, setShowPopup] = useState(false);
    
    const role = 'user';

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleViewReceipt = (transaction) => {
        navigate(`/receipt-user/${transaction.id}`, { state: { transaction } });
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
                    {history.map((transaction) => (
                        <div key={transaction.id} className="history-item">
                            <img src={transaction.products[0].image} alt={transaction.products[0].name} className="item-image" />
                            <div className="item-details">
                                <h3 className="item-name">{transaction.products[0].name}</h3>
                                <p>Total Items: {transaction.products.length}</p>
                                <p>Price: Rp {transaction.products[0].price.toLocaleString('id-ID')}</p>
                                <p>Total Price: Rp {transaction.total.toLocaleString('Id-ID')}</p>
                                <p>Total Ongkir: Rp {transaction.shippingCost.toLocaleString('id-ID')}</p>
                                <p>Date: {transaction.date}</p>
                                <p>Payment Method: {transaction.paymentMethod}</p>
                                <button onClick={() => handleViewReceipt(transaction)} className="receipt-button">Lihat Bukti</button>
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