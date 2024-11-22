// src/components/CartItem.js
import React from 'react';
import RemoveButton from './ButtonRemove.js';
import './CSS/CartItem.css';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, parseInt(e.target.value)); // Pastikan minimal 1
        onQuantityChange(item.id, newQuantity);
    };

    const handleRemove = () => {
        onRemove(item.id);
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <div className="cart-item-price-detail">
                    <p className="cart-item-price">Rp {item.price.toLocaleString()}</p>
                    <p className="cart-item-total">
                        Total: Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="cart-item-quantity"
                    />
                    <RemoveButton onClick={handleRemove} />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
