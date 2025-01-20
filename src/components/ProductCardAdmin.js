import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/ProductCardAdmin.css';

const ProductCardAdmin = ({ product, productList, setProductList }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/edit-product/${product.id_product}`); // Navigasi ke halaman edit produk
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/products/${product.id_product}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Gagal menghapus produk');
            }

            alert('Produk berhasil dihapus');
            const updatedProducts = productList.filter((item) => item.id !== product.id_product);
            setProductList(updatedProducts);
        } catch (error) {
            alert('Terjadi kesalahan saat menghapus produk: ' + error.message);
            console.error('Error deleting product:', error);
        }
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
                <h3 className="product-name">{product.name_product}</h3>
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
