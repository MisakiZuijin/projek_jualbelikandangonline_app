// src/components/Cart/Cart.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const { profilePic } = useContext(ProfileUserContext);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = () => {
        // Logika logout (misalnya, hapus token autentikasi)
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile-user');
        setShowPopup(false); // Tutup popup setelah navigasi
    };

    const handleHistory = () => {
        navigate('/history-user');
        setShowPopup(false);
    };

    const handleQuantityChange = (id, quantity) => {
        updateQuantity(id, Math.max(1, quantity)); // Ensure quantity is at least 1
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handlePayment = () => {
        console.log("Proceeding to payment with items:", cartItems);
    };

    // Calculate the total price of all items in the cart
    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <header className="header-cart">
                <h1 className="title">CAGE SHOP</h1>
                <div className="user-info">
                    <i className="fas fa-shopping-cart cart-icon"></i>
                    <span className="user-name" onClick={togglePopup}>UserName</span>
                    <img className="profile-pic-cart" src={profilePic} alt="Profile" onClick={togglePopup} />
                </div>

                {showPopup && (
                    <div className="popup-menu">
                        <Link onClick={handleEditProfile} to="/edit-profile-user" className="popup-item">Edit Profile</Link>
                        <Link onClick={handleHistory} to="/history-user" className="popup-item">History</Link>
                        <button onClick={handleLogout} className="popup-item logout-button">Logout</button>
                    </div>
                )}
            </header>

            <main className="cart-content">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2 className="cart-item-name">{item.name}</h2>
                                <p className="cart-item-price">Rp {item.price.toLocaleString()}</p>
                                <p className="cart-item-total">
                                    Total: Rp {(item.price * item.quantity).toLocaleString()}
                                </p>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    className="cart-item-quantity"
                                />
                                <button onClick={() => handleRemove(item.id)} className="remove-button">Batalkan</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Keranjang Kosong</p>
                )}

                {/* Display the total cart price */}
                {cartItems.length > 0 && (
                    <div className="cart-total">
                        <h3>Total Price: Rp {cartTotal.toLocaleString()}</h3>
                        <button onClick={handlePayment} className="pay-now-button">Pay Now</button>
                    </div>
                )}
            </main>

            <button className="back-button" onClick={() => navigate(-1)}>
                <span className="back-icon">&#8592;</span>
            </button>

            <footer className="footer-cart">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Cart;
