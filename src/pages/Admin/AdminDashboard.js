// AdminDashboard.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupMenu from '../../components/PopupMenu.js';
import { ProfileAdminContext } from '../../context/ProfileAdminContext';
import ProductCardAdmin from '../../components/ProductCardAdmin';
import { ProductContext } from '../../context/ProductContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { productList, setProductList } = useContext(ProductContext);
    const { profile } = useContext(ProfileAdminContext);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const role = 'admin';

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const filteredProducts = productList.filter(product =>
        product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1 className="store-name">CAGE SHOP</h1>
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Cari Produk..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="order-button">Pesanan</button>
                <div className="admin-info" onClick={togglePopup}>
                    <span className="admin-name" onClick={togglePopup}>{profile.username}</span>
                    <img className="admin-profile-pic" src={profile.profilePic} alt="Profile" onClick={togglePopup}/>
                </div>
                
                {showPopup && <PopupMenu role={role} onClose={togglePopup} />}
            </header>

            <main className="dashboard-content">
                <button className="add-product-button" onClick={handleAddProduct}>Tambah Produk</button>
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <div key={product.id_product}>
                            <ProductCardAdmin
                                key={product.id_product}
                                product={product}
                                productList={productList}
                                setProductList={setProductList}
                            />
                        </div>
                    ))}
                </div>
            </main>

            <footer className="admin-footer">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;