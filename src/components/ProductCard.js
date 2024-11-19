import React from 'react';
import './CSS/ProductCard.css'; // Buat file CSS khusus untuk komponen ini, jika perlu

const ProductCard = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={() => onClick(product)}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Rp {product.price.toLocaleString()}</p>
            <p className="product-sold">Sold: {product.sold}</p>
            <p className="product-stock">Stock: {product.stock}</p>
        </div>
    );
};

export default ProductCard;
