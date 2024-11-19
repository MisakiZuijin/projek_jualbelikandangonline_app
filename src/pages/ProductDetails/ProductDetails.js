// src/components/ProductDetails/ProductDetails.js
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import { CartContext } from '../../context/CartContext';
import PopupMenu from '../../components/PopupMenu.js';
import BackButton from '../../components/ButtonBack.js';
import './ProductDetails.css';

const ProductDetails = () => {
    const { profilePic } = useContext(ProfileUserContext);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCart = () => {
        navigate('/cart');
    }

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} has been added to the cart.`);
    };

    // Sample product data for demonstration
    const product = location.state?.product;

    if (!product) {
        navigate(-1); // Atau arahkan ke halaman error atau halaman lain yang sesuai
        return null;
    }

    return (
        <div className="product-details-container">
            <header className="header">
                <h1 className="title">CAGE SHOP</h1>
                <div className="user-info">
                    <i className="fas fa-shopping-cart cart-icon" onClick={handleCart} to="/cart"></i>
                    <span className="user-name" onClick={togglePopup}>UserName</span>
                    <img className="profile-pic-product" src={profilePic} alt="Profile" onClick={togglePopup}/>
                </div>

                {showPopup && <PopupMenu onClose={togglePopup} />}
            </header>

            <main className="product-details-content">
                <div className="product-title-image">
                    <img src={product.image} alt={product.name} className="product-image-large" />
                </div>
                <div className="product-content">
                    <div className="product-description">
                        <h2>{product.name}</h2>
                        <p>Area: {product.area}</p>
                        <p>Rating: {product.rating} ★</p>
                        <p>Sold: {product.sold}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Price: Rp {product.price.toLocaleString()}</p>
                        <p>Payment Methods: {product.paymentMethods ? product.paymentMethods.join(', ') : 'N/A'}</p>
                        <p className="description-content">Description: {product.description || 'No description available.'}</p>
                    </div>
                    <div className="product-button">
                        <button onClick={handleAddToCart} className="add-to-cart-button">Tambah Ke Keranjang</button>
                        <button className="buy-now-button">Beli Sekarang</button>
                    </div>
                </div>
            </main>

            <BackButton/>

            <footer className="footer-product">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProductDetails;
