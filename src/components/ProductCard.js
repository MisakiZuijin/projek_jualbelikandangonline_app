import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/ProductCard.css'; // Tambahkan CSS sesuai kebutuhan

const ProductCard = ({ product }) => {

    const formatCurrency = (price) => {
        return `Rp ${Number(price).toLocaleString('id-ID')}`;
    };

    return (
        <Link to={`/product/${product.id_product}`} state={{ product }} className="product-card-link">
            <div className="product-card">
                <img
                    src={`http://localhost:4000/uploads/${product.img_product}`}
                    alt={product.name_product}
                    className="product-image"
                />
                <h2 className="product-name">{product.name_product}</h2>
                <p className="product-price">Price: Rp {formatCurrency(product.price)}</p>
                <p className="product-stock">Stock: {product.stock}</p>
            </div>
        </Link>
    );

};

export default ProductCard;
