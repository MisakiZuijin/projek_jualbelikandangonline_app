// src/components/Receipt/Receipt.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/ButtonBack.js';
import './Receipt.css';

const purchaseHistory = [
    {
        id: 1,
        noReceipt: "240101220101",
        noOrder: "2401012201",
        image: "/Kandang-Murai.jpg",
        name: "Kandang Murai",
        seller: "Sugeng",
        quantity: 2,
        price: 200000,
        postage: 15000,
        total: 415000,
        buyer: "Nur Rahman Saleh",
        address: "123 Main St, City",
        date: "2024-11-05",
        paymentMethod: "COD",
    },
    {
        id: 2,
        noReceipt: "240101220202",
        noOrder: "2401012202",
        image: "/Kandang-Murai.jpg",
        name: "Kandang Murai",
        seller: "Sugeng",
        quantity: 1,
        price: 200000,
        postage: 15000,
        total: 215000,
        buyer: "Nur Rahman Saleh",
        address: "123 Main St, City",
        date: "2024-11-04",
        paymentMethod: "Transfer",
    },
    {
        id: 3,
        noReceipt: "240101220303",
        noOrder: "2401012203",
        image: "/Kandang-Murai.jpg",
        name: "Kandang Murai",
        seller: "Sugeng",
        quantity: 1,
        price: 200000,
        postage: 15000,
        total: 215000,
        buyer: "Nur Rahman Saleh",
        address: "123 Main St, City",
        date: "2024-11-04",
        paymentMethod: "Transfer",
    }
    // Add more purchases as needed
];

const Receipt = () => {
    const { id } = useParams();
    const purchase = purchaseHistory.find(item => item.id === parseInt(id));

    if (!purchase) {
        return <p>Receipt not found.</p>;
    }

    return (
        <div className="receipt-container">
            <div className="receipt-content">
                <div className="receipt-header">
                    <h1 className="store-name">CAGE SHOP</h1>
                </div>
                <div className="receipt-image-title">    
                    <h2>Bukti Pembelian {purchase.name}</h2>
                    <img src={purchase.image} alt={purchase.name} className="receipt-image" />
                </div>
                <div className="receipt-description">
                    <div className="receipt-date-number">
                        <p>No Receipt: {purchase.noReceipt}</p>
                        <p>No Order: {purchase.noOrder}</p>
                        <p>Date: {purchase.date}</p>
                    </div>
                    <div className="receipt-item-container">
                        <p>Item Name: {purchase.name}</p>
                        <p>Seller: {purchase.seller}</p>
                        <p>Quantity: {purchase.quantity}</p>
                        <div className="receipt-price">
                            <p>Price: Rp {purchase.price.toLocaleString()}</p>
                            <p>Postage: Rp {purchase.postage.toLocaleString()}</p>
                            <p>Total: Rp {purchase.total.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="receipt-buyer-container">
                        <p>Buyer: {purchase.buyer}</p>
                        <p>Address: {purchase.address}</p>
                        <p>Payment Method: {purchase.paymentMethod}</p>
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