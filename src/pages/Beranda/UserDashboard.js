import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import { ProductContext } from '../../context/ProductContext.js';
import PopupMenu from '../../components/PopupMenu.js';
import ProductCard from '../../components/ProductCard';
import './UserDashboard.css';

const Home = () => {
    const { profile } = useContext(ProfileUserContext);
    const { productList } = useContext(ProductContext);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const role = 'user';


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCart = () => {
        navigate('/cart');
    };

    const filteredProducts = productList.filter(product =>
        product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-container">
            <header className="header">
                <h1 className="title">CAGE SHOP</h1>
                <input 
                    type="text" 
                    placeholder="Cari Produk..." 
                    className="search-bar"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <div className="user-info">
                    <i className="fas fa-shopping-cart cart-icon" onClick={handleCart} to="/cart"></i>
                    <span className="user-name" onClick={togglePopup} >{profile.username}</span>
                    <img className="profile-pic-home" src={profile.profilePic} alt="Profile" onClick={togglePopup}/>
                </div>
                
                {showPopup && <PopupMenu role={role} onClose={togglePopup} />}
            </header>

            <main className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id_product} 
                        product={product}
                    />
                ))}
            </main>

            <footer className="footer">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;