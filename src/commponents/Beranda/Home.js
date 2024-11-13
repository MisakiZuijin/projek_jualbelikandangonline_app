import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { ProfileUserContext } from '../../context/ProfileUserContext';
import './Home.css';

const Home = () => {
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

    const handleCart = () => {
        navigate('/cart');
    };

    const handleProductClick = (product) => {
        // Pastikan hanya data produk sederhana yang dikirimkan
        navigate(`/product/${product.id}`, { state: { product } });
    };
    
    const products = [
        {
            id: 1,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 2,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 3,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 4,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 5,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 6,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 7,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 8,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 9,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        {
            id: 10,
            image: "/Kandang-Murai.jpg",
            name: "Kandang Murai",
            area: "Karanganyar",
            rating: 4.5,
            price: 200000,
            sold: 15,
            stock: 30,
            paymentMethods: ["COD", "Transfer"],
            description: "Kandang Murai, Diameter -+ 58cm, Warna polos"
        },
        
        // Tambahkan produk lain sesuai kebutuhan
    ];

    return (
        <div className="home-container">
            <header className="header">
                <h1 className="title">CAGE SHOP</h1>
                <input type="text" className="search-bar" placeholder="Cari Produk..."/>
                <div className="user-info">
                    <i className="fas fa-shopping-cart cart-icon" onClick={handleCart} to="/cart"></i>
                    <span className="user-name" onClick={togglePopup}>UserName</span>
                    <img className="profile-pic-home" src={profilePic} alt="Profile" onClick={togglePopup}/>
                </div>
                {/* Popup Menu */}
                {showPopup && (
                    <div className="popup-menu">
                        <Link onClick={handleEditProfile} to="/edit-profile-user" className="popup-item">Edit Profile</Link>
                        <Link onClick={handleHistory} to="/history-user" className="popup-item">History</Link>
                        <button onClick={handleLogout} className="popup-item logout-button">Logout</button>
                    </div>
                )}
            </header>

            <main className="product-display">
                {products.map(product => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product)} >
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">Rp {product.price.toLocaleString()}</p>
                        <p className="product-sold">Sold: {product.sold}</p>
                        <p className="product-stock">Stock: {product.stock}</p>
                    </div>
                ))}
            </main>

            <footer className="footer">
                <p>&copy; 2024 CAGE SHOP. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;