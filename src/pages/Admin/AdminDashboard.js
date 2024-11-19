// AdminDashboard.js
import React, { useContext, useState } from 'react';
import { ProfileAdminContext } from '../../context/ProfileAdminContext';
import PopupMenu from '../../components/PopupMenu.js';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { profilePic } = useContext(ProfileAdminContext);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const [products, setProducts] = useState([
        { id: 1, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 2, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 3, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 4, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 5, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 6, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 7, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        { id: 8, name: "Kandang Murai", price: 200000, sold: 15, stock: 30 },
        // Tambahkan produk lain di sini
    ]);

    const handleAddProduct = () => {
        // Tambah logika untuk menambahkan produk baru
        alert("Tambah produk baru");
    };

    const handleEditProduct = (productId) => {
        // Tambah logika untuk mengedit produk
        alert(`Edit produk ${productId}`);
    };

    const handleDeleteProduct = (productId) => {
        // Tambah logika untuk menghapus produk
        setProducts(products.filter((product) => product.id !== productId));
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1 className="store-name">CAGE SHOP</h1>
                <input type="text" className="search-bar-admin" placeholder="Cari Produk..." />
                <button className="order-button">Pesanan</button>
                <div className="admin-info" onClick={togglePopup}>
                    <span className="admin-name">AdminName</span>
                    <img className="admin-profile-pic" src={profilePic} alt="Profile" />
                </div>
                
                {showPopup && <PopupMenu onClose={togglePopup} />}
            </header>

            <main className="dashboard-content">
                <button className="add-product-button" onClick={handleAddProduct}>Tambah Produk</button>
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-card-admin">
                            <img src="/Kandang-Murai.jpg" alt={product.name} className="product-image" />
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">Harga: Rp{product.price.toLocaleString()}</p>
                                <p className="product-sold">Terjual: {product.sold}</p>
                                <p className="product-stock">Stok: {product.stock}</p>
                                <div className="product-actions">
                                    <button onClick={() => handleEditProduct(product.id)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Hapus</button>
                                </div>
                            </div>
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