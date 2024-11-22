// src/components/Cart/Cart.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import CartItem from '../../components/CartItem.js';
import PopupMenu from '../../components/PopupMenu.js';
import BackButton from '../../components/ButtonBack.js';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const { profile } = useContext(ProfileUserContext);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const role = 'user';

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handlePayNow = () => {
        navigate('/pay-now', { state: { products: cartItems } });
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
                    <span className="user-name" onClick={togglePopup}>{profile.username}</span>
                    <img className="profile-pic-cart" src={profile.profilePic} alt="Profile" onClick={togglePopup} />
                </div>

                {showPopup && <PopupMenu role={role} onClose={togglePopup} />}
            </header>

            <main className="cart-content">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={removeFromCart}
                            onQuantityChange={updateQuantity}
                        />
                    ))
                ) : (
                    <p>Keranjang Kosong</p>
                )}

                {cartItems.length > 0 && (
                    <div className="cart-total">
                        <h3>Total Price: Rp {cartTotal.toLocaleString()}</h3>
                        <button onClick={handlePayNow} className="pay-now-button">Pay Now</button>
                    </div>
                )}
            </main>

            <BackButton />

            <footer className="footer-cart">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Cart;
