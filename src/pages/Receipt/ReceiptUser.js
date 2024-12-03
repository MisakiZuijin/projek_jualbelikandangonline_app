import React from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/ButtonBack.js';
import './Receipt.css';

const Receipt = () => {
    const location = useLocation();
    const transaction = location.state?.transaction; // Ambil transaksi spesifik dari state

    if (!transaction) {
        return <p>Receipt not found.</p>;
    }

    return (
        <div className="receipt-container">
            <div className="receipt-content">
                <div className="receipt-header">
                    <h1 className="store-name">CAGE SHOP</h1>
                </div>
                <div className="receipt-image-title">    
                    <h2>Bukti Pembelian {transaction.products[0].name}</h2>
                    <img src={transaction.products[0].image} alt={transaction.products[0].name} className="receipt-image" />
                </div>
                <div className="receipt-description">
                    <div className="receipt-date-number">
                        <p>No Receipt: {transaction.id}</p>
                        <p>No Order: {transaction.id}</p>
                        <p>Date: {transaction.date}</p>
                    </div>
                    <div className="receipt-item-container">
                        <p>Item Name: {transaction.products[0].name}</p>
                        <p>Seller: Unknown</p> {/* Tambahkan data seller jika ada */}
                        <p>Quantity: {transaction.products[0].quantity}</p>
                        <div className="receipt-price">
                            <p>Price: Rp {transaction.products[0].price.toLocaleString('Id-ID')}</p>
                            <p>Postage: Rp {transaction.shippingCost.toLocaleString('Id-ID')}</p>
                            <p>Total: Rp {transaction.total.toLocaleString('Id-ID')}</p>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="receipt-buyer-container">
                        <p>Buyer: {transaction.buyer}</p>
                        <p>Address: {transaction.address}</p>
                        <p>Payment Method: {transaction.paymentMethod}</p>
                    </div>
                </div>
            </div>

            <BackButton />

            <footer className="footer-receipt">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Receipt;