import React from 'react';
import './CSS/ProductCardAdmin.css';

const ProductCardAdmin = ({ product, productList, setProductList }) => {

    const handleEdit = () => {
        alert(`Edit produk ${product.name}`);
    };

    const handleDelete = () => {
        const updatedProducts = productList.filter((item) => item.id !== product.id);
        setProductList(updatedProducts);
    };

    const formatCurrency = (price) => {
        return `Rp ${Number(price).toLocaleString('id-ID')}`;
    };

    return (
        <div className="product-card-admin">
            <img
                src={`http://localhost:4000/uploads/${product.img_product}`}
                alt={product.name_product}
                className="product-image"
            />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Harga: {formatCurrency(product.price)}</p>
                <p className="product-sold">Terjual: {product.sold}</p>
                <p className="product-stock">Stok: {product.stock}</p>
                <div className="product-actions">
                    <button onClick={handleEdit} className="edit-button">Edit</button>
                    <button onClick={handleDelete} className="delete-button">Hapus</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardAdmin;
